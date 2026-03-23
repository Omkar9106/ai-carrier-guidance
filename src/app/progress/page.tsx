'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import { FiAward, FiBarChart2, FiCheckCircle, FiCode, FiPlay, FiSearch, FiStar, FiTarget, FiZap } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
}

interface QuizResult {
  id: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: any;
  quiz: Quiz;
  userId: string;
  quizId: string;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
}

interface ChartData {
  id: string;
  name: string;
  score: number;
  total: number;
  date: string;
  percentage: number;
  category: string;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TABS = {
  overview: 'overview',
  achievements: 'achievements'
} as const;

type TabType = 'overview' | 'achievements';

export default function ProgressPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>(TABS.overview);
  const [quizData, setQuizData] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate derived state
  const totalQuizzes = quizData.length;
  const perfectScores = quizData.filter(q => q.percentage === 100).length;
  const averageScore = totalQuizzes > 0 
    ? (quizData.reduce((sum, quiz) => sum + quiz.percentage, 0) / totalQuizzes).toFixed(1)
    : '0.0';
  const uniqueCategories = new Set(quizData.map(q => q.quiz.category)).size;
  
  // Badges data that depends on state
  const badges: Badge[] = [
    { 
      id: 1, 
      name: 'Quick Learner', 
      description: 'Complete your first quiz', 
      icon: <FiZap className="w-6 h-6 text-yellow-400" />, 
      earned: totalQuizzes > 0 
    },
    { 
      id: 2, 
      name: 'Perfect Score', 
      description: 'Get 100% on any quiz', 
      icon: <FiStar className="w-6 h-6 text-blue-400" />, 
      earned: perfectScores > 0 
    },
    { 
      id: 3, 
      name: 'Master of All', 
      description: 'Complete quizzes in 3 different categories', 
      icon: <FiAward className="w-6 h-6 text-purple-400" />, 
      earned: uniqueCategories >= 3 
    },
    { 
      id: 4, 
      name: 'Consistent Performer', 
      description: 'Maintain above 80% average', 
      icon: <FiCheckCircle className="w-6 h-6 text-green-400" />, 
      earned: parseFloat(averageScore) >= 80 
    },
  ];

  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!session?.user?.email) return;
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/quiz-results');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz results');
        }
        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        console.error('Error fetching quiz results:', err);
        setError('Failed to load quiz results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizResults();
  }, [session]);

  // Transform data for charts
  const chartData: ChartData[] = quizData.map(quiz => ({
    id: quiz.id,
    name: quiz.quiz.title,
    score: quiz.score,
    total: quiz.total,
    date: formatDate(quiz.completedAt),
    percentage: quiz.percentage,
    category: quiz.quiz.category,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const totalPossibleScore = quizData.reduce((sum, quiz) => sum + quiz.total, 0);
  const totalEarnedScore = quizData.reduce((sum, quiz) => sum + quiz.score, 0);
  
  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Correct', value: totalEarnedScore },
    { name: 'Incorrect', value: totalPossibleScore - totalEarnedScore },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Learning Progress</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">Total Quizzes</h3>
            <p className="text-3xl font-bold text-blue-600">{totalQuizzes}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{averageScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">Perfect Scores</h3>
            <p className="text-3xl font-bold text-purple-600">{perfectScores}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">Categories Mastered</h3>
            <p className="text-3xl font-bold text-purple-600">{uniqueCategories}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
          >
            Achievements
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quiz Performance Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Quiz Performance</h2>
              <div className="h-80">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-full text-red-500">
                    {error}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" name="Score %" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Score Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Score Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(({ name, value }: { name?: string | number; value?: string | number }) => {
                          const displayName = name?.toString() || 'Unknown';
                          const displayValue = Number(value) || 0;
                          const percentage = totalPossibleScore > 0 ? Math.round((displayValue / totalPossibleScore) * 100) : 0;
                          return `${displayName}: ${percentage}%`;
                        }) as any}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Quizzes</h2>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : quizData.length === 0 ? (
                    <p className="text-slate-500">No quiz results found</p>
                  ) : (
                    <div className="space-y-4">
                      {quizData.slice(0, 5).map((quiz) => (
                        <div key={quiz.id} className="border-b border-slate-100 pb-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-slate-800">{quiz.quiz.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quiz.percentage >= 80 ? 'bg-green-100 text-green-800' : 
                              quiz.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {quiz.percentage}%
                            </span>
                          </div>
                          <p className="text-sm text-slate-500">{quiz.quiz.category} • {formatDate(quiz.completedAt)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-xl border-2 ${
                    badge.earned
                      ? 'bg-white border-blue-100 shadow-sm'
                      : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      badge.earned ? 'bg-blue-50' : 'bg-slate-100'
                    }`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        badge.earned ? 'text-slate-800' : 'text-slate-400'
                      }`}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-slate-500">{badge.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      badge.earned
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {badge.earned ? 'Earned' : 'Locked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {perfectScores > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiAward className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-yellow-800">Perfect Score Champion!</h3>
                    <p className="text-yellow-700">
                      You've achieved a perfect score in {perfectScores} {perfectScores === 1 ? 'quiz' : 'quizzes'}! Keep up the great work!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
