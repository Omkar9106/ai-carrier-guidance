'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Header from "@/components/Header";
import QuizModal from '@/components/QuizModal';
import Chatbot from '@/components/Chatbot';
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Hide header on home page, login and signup pages
    setIsHomePage(pathname === '/' || pathname === '/login' || pathname === '/signup');
  }, [pathname]);
  
  const handleQuizComplete = (result: { score: number; totalQuestions: number; identifiedSkills: string[] }) => {
    // You can handle the quiz completion here if needed
    console.log('Quiz completed with score:', result.score, '/', result.totalQuestions);
    console.log('Identified skills:', result.identifiedSkills);
    setIsQuizOpen(false);
  };
  
  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  return (
    <SessionProvider>
      {!isHomePage && (
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onOpenQuiz={handleOpenQuiz}
          onOpenChat={() => setIsChatOpen(true)}
        />
      )}
      {children}
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)}
        onQuizComplete={handleQuizComplete}
      />
      
      <Chatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </SessionProvider>
  );
}
