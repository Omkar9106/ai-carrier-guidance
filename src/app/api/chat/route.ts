import { NextResponse } from 'next/server';

// This is a client-side API key - in production, you should use environment variables
const API_KEY = 'AIzaSyAf5MAFVsnzDqMe_8iBo6H1vb_CPMtTnjs';
// Using the more available Gemini 1.0 Pro model
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Fallback responses for when AI service is unavailable
const fallbackResponses = [
  "I'm your AI Career Advisor! I can help you understand skills needed for different careers, analyze skill gaps, and suggest learning paths. What specific career guidance are you looking for?",
  "As SkillBot, I'm here to provide career guidance. You can ask me about job market trends, required skills for different roles, or how to transition between careers. What would you like to know?",
  "I specialize in career advice and skill development. I can help you with understanding job requirements, identifying skill gaps, and suggesting improvement strategies. How can I assist you today?",
  "Welcome! I'm your AI Career Assistant. I can provide insights on various careers, skill requirements, and development paths. What career questions do you have?",
  "I'm here to help with your career journey! I can analyze skills needed for different jobs, suggest learning resources, and provide guidance on career transitions. What would you like to explore?"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    console.log('Received chat request:', { message: message?.substring(0, 100) });

    if (!message) {
      console.error('No message provided in request');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Sending request to Google AI API...');
    
    let response;
    try {
      response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `System Message (or training instruction):
You are a professional AI Career Advisor called "SkillBot." You help users understand the skills required for different careers, analyze skill gaps, suggest improvements, and provide accurate, practical guidance about future job trends, roles, and career development paths. Be helpful, clear, and concise. Speak in a motivating but honest tone. ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });
    } catch (fetchError) {
      console.error('Network error when calling AI API:', fetchError);
      // Return fallback response
      const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ reply: fallbackReply });
    }

    if (!response.ok) {
      const errorText = await response.text();
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      };

      console.error('Google AI API error:', errorDetails);

      if (response.status === 429) {
        console.log('Rate limit exceeded, returning fallback response');
        const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        return NextResponse.json({ reply: fallbackReply });
      }

      if (response.status === 400 || response.status === 403) {
        console.log('API key or request error, returning fallback response');
        const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        return NextResponse.json({ reply: fallbackReply });
      }

      throw new Error(`AI service error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if the response has the expected structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid AI response structure:', data);
      const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ reply: fallbackReply });
    }

    const reply = data.candidates[0].content.parts[0].text || "I'm sorry, I couldn't process your request at the moment.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return fallback response instead of error
    const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return NextResponse.json({ reply: fallbackReply });
  }
}
