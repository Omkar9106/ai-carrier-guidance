import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { QuizQuestion, QuizRequest } from '@/types/quiz';

// Fallback questions when AI service is unavailable
const fallbackQuestions: QuizQuestion[] = [
  {
    question: "What is the primary purpose of React hooks?",
    options: [
      "To style components",
      "To manage state and side effects in functional components",
      "To handle routing",
      "To make API calls"
    ],
    correctAnswerIndex: 1,
    skill: "React"
  },
  {
    question: "Which method is used to prevent default browser behavior in React events?",
    options: [
      "event.stop()",
      "event.preventDefault()",
      "event.cancel()",
      "event.block()"
    ],
    correctAnswerIndex: 1,
    skill: "React"
  },
  {
    question: "What does REST stand for in API design?",
    options: [
      "Representational State Transfer",
      "Remote State Transfer",
      "Resource State Transfer",
      "Representational Service Transfer"
    ],
    correctAnswerIndex: 0,
    skill: "Backend"
  },
  {
    question: "Which HTTP method is typically used to update existing data?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    correctAnswerIndex: 2,
    skill: "Backend"
  },
  {
    question: "What is the purpose of CORS in web development?",
    options: [
      "To optimize database queries",
      "To allow cross-origin requests",
      "To compress images",
      "To cache responses"
    ],
    correctAnswerIndex: 1,
    skill: "Backend"
  },
  {
    question: "Which CSS property is used to create flexible layouts?",
    options: [
      "position",
      "display",
      "flex",
      "float"
    ],
    correctAnswerIndex: 2,
    skill: "CSS"
  },
  {
    question: "What is the box model in CSS?",
    options: [
      "A way to create 3D effects",
      "A layout system for organizing content",
      "The concept of content, padding, border, and margin",
      "A method for responsive design"
    ],
    correctAnswerIndex: 2,
    skill: "CSS"
  },
  {
    question: "Which JavaScript method is used to add elements to an array?",
    options: [
      "push()",
      "add()",
      "insert()",
      "append()"
    ],
    correctAnswerIndex: 0,
    skill: "JavaScript"
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A way to close browser windows",
      "A function that has access to variables in its outer scope",
      "A method to stop execution",
      "A type of loop"
    ],
    correctAnswerIndex: 1,
    skill: "JavaScript"
  },
  {
    question: "What is the purpose of async/await in JavaScript?",
    options: [
      "To create loops",
      "To handle asynchronous operations more cleanly",
      "To validate forms",
      "To style elements"
    ],
    correctAnswerIndex: 1,
    skill: "JavaScript"
  }
];

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
}) : null;

function buildPrompt(role: string, count: number, experience: string, topics: string[]): string {
  const exp = experience ? ` with ${experience} experience` : '';
  const topicsStr = topics.length > 0 ? topics.join(', ') : 'general programming concepts';
  
  return `Generate a JSON array of ${count} multiple-choice questions for the role of a ${role}${exp}. Cover key areas such as ${topicsStr}. Each object MUST have: "question" (string), "options" (array of 4 strings), "correctAnswerIndex" (number 0-3), and "skill" (string). Make questions progressively harder. Return ONLY valid JSON array, no extra text.`;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuizRequest = await request.json();
    const { role = 'Full Stack Developer', experience = '', technologies = [], count = 20 } = body;

    // If no API key is available, use fallback questions
    if (!genAI) {
      console.log('GEMINI_API_KEY not set, using fallback questions');
      
      // Shuffle fallback questions and select requested amount
      const shuffled = fallbackQuestions.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
      
      return NextResponse.json(selectedQuestions);
    }

    const prompt = buildPrompt(role, count, experience, technologies);

    const config = {
      temperature: 0.2,
    };
    const model = 'gemini-2.0-flash-lite';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await genAI.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = '';
    for await (const chunk of response) {
      fullText += chunk.text;
    }

    let data: QuizQuestion[];
    try {
      data = JSON.parse(fullText);
    } catch {
      // Fallback: try to locate JSON in text
      const match = fullText.match(/\[[\s\S]*\]/);
      data = match ? JSON.parse(match[0]) : [];
    }

    // If AI fails to generate valid questions, use fallback
    if (!Array.isArray(data) || data.length === 0) {
      console.log('AI generated invalid questions, using fallback');
      const shuffled = fallbackQuestions.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
      return NextResponse.json(selectedQuestions);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Quiz generation error:', err);
    
    // Always return fallback questions on error
    console.log('Error occurred, using fallback questions');
    const shuffled = fallbackQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 20);
    
    return NextResponse.json(selectedQuestions);
  }
}
