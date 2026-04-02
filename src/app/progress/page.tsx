'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Award, 
  Star, 
  Zap, 
  CheckCircle, 
  BarChart3, 
  PieChart, 
  Clock,
  BookOpen,
  Flame,
  Brain,
  Rocket,
  Crown
} from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  color: string;
  glowColor: string;
}

interface SkillProgress {
  category: string;
  level: number;
  experience: number;
  maxExperience: number;
  color: string;
  icon: React.ReactNode;
}

interface RecentActivity {
  id: number;
  type: 'quiz' | 'course' | 'achievement';
  title: string;
  score?: number;
  timestamp: string;
  color: string;
}

const ProgressPage = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'skills'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    streakDays: 0,
    totalHours: 0
  });

  // Mock data - replace with actual API calls
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Quick Starter",
      description: "Complete your first quiz",
      icon: <Zap className="w-6 h-6" />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      color: "from-yellow-400 to-orange-500",
      glowColor: "shadow-yellow-500/25"
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Score 100% on 10 quizzes",
      icon: <Trophy className="w-6 h-6" />,
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      color: "from-purple-400 to-pink-500",
      glowColor: "shadow-purple-500/25"
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "7-day learning streak",
      icon: <Flame className="w-6 h-6" />,
      progress: 5,
      maxProgress: 7,
      unlocked: false,
      color: "from-red-400 to-orange-500",
      glowColor: "shadow-red-500/25"
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Complete 50 quizzes",
      icon: <BookOpen className="w-6 h-6" />,
      progress: 23,
      maxProgress: 50,
      unlocked: false,
      color: "from-blue-400 to-cyan-500",
      glowColor: "shadow-blue-500/25"
    },
    {
      id: 5,
      title: "Perfect Score",
      description: "Achieve 100% accuracy",
      icon: <Star className="w-6 h-6" />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      color: "from-green-400 to-emerald-500",
      glowColor: "shadow-green-500/25"
    },
    {
      id: 6,
      title: "Speed Demon",
      description: "Complete quiz in under 2 minutes",
      icon: <Rocket className="w-6 h-6" />,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      color: "from-indigo-400 to-purple-500",
      glowColor: "shadow-indigo-500/25"
    }
  ];

  const skillsProgress: SkillProgress[] = [
    {
      category: "JavaScript",
      level: 3,
      experience: 750,
      maxExperience: 1000,
      color: "from-yellow-400 to-amber-500",
      icon: <Brain className="w-5 h-5" />
    },
    {
      category: "React",
      level: 2,
      experience: 450,
      maxExperience: 800,
      color: "from-cyan-400 to-blue-500",
      icon: <Target className="w-5 h-5" />
    },
    {
      category: "Python",
      level: 4,
      experience: 890,
      maxExperience: 1200,
      color: "from-green-400 to-emerald-500",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      category: "Data Science",
      level: 2,
      experience: 320,
      maxExperience: 600,
      color: "from-purple-400 to-pink-500",
      icon: <PieChart className="w-5 h-5" />
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: 1,
      type: 'quiz',
      title: 'JavaScript Fundamentals',
      score: 95,
      timestamp: '2 hours ago',
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Quick Starter Unlocked!',
      timestamp: '5 hours ago',
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'quiz',
      title: 'React Hooks Mastery',
      score: 88,
      timestamp: '1 day ago',
      color: 'text-blue-400'
    },
    {
      id: 4,
      type: 'course',
      title: 'Python for Data Science',
      timestamp: '2 days ago',
      color: 'text-purple-400'
    }
  ];

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Animate stats
      const targetStats = {
        totalQuizzes: 23,
        averageScore: 87,
        streakDays: 5,
        totalHours: 12
      };
      
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      let currentStep = 0;
      const animateStats = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedStats({
          totalQuizzes: Math.round(targetStats.totalQuizzes * easeOutQuart),
          averageScore: Math.round(targetStats.averageScore * easeOutQuart),
          streakDays: Math.round(targetStats.streakDays * easeOutQuart),
          totalHours: Math.round(targetStats.totalHours * easeOutQuart)
        });
        
        if (currentStep >= steps) {
          clearInterval(animateStats);
        }
      }, interval);
      
      return () => clearInterval(animateStats);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Your Learning Journey
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Track your progress, unlock achievements, and master new skills
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: <Target className="w-6 h-6" />,
              label: "Total Quizzes",
              value: animatedStats.totalQuizzes,
              color: "from-blue-500 to-cyan-500",
              bgColor: "from-blue-500/10 to-cyan-500/10"
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              label: "Average Score",
              value: `${animatedStats.averageScore}%`,
              color: "from-green-500 to-emerald-500",
              bgColor: "from-green-500/10 to-emerald-500/10"
            },
            {
              icon: <Flame className="w-6 h-6" />,
              label: "Learning Streak",
              value: `${animatedStats.streakDays} days`,
              color: "from-orange-500 to-red-500",
              bgColor: "from-orange-500/10 to-red-500/10"
            },
            {
              icon: <Clock className="w-6 h-6" />,
              label: "Learning Hours",
              value: `${animatedStats.totalHours}h`,
              color: "from-purple-500 to-pink-500",
              bgColor: "from-purple-500/10 to-pink-500/10"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative group bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              <div className="relative">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} w-fit mb-4 shadow-lg`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Progress Chart */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  Weekly Progress
                </h2>
                <div className="grid grid-cols-7 gap-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="text-slate-400 text-sm mb-3">{day}</p>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                      ></motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-purple-400" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg bg-slate-700/50 ${activity.color}`}>
                          {activity.type === 'quiz' && <Target className="w-5 h-5" />}
                          {activity.type === 'achievement' && <Trophy className="w-5 h-5" />}
                          {activity.type === 'course' && <BookOpen className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{activity.title}</h3>
                          <p className="text-slate-400 text-sm">{activity.timestamp}</p>
                        </div>
                      </div>
                      {activity.score && (
                        <div className={`px-3 py-1 rounded-lg bg-green-500/20 text-green-400 font-semibold`}>
                          {activity.score}%
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {selectedTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative group ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600/50' 
                      : 'bg-slate-800/30 border-slate-700/30'
                  } rounded-2xl p-6 border transition-all duration-300`}
                >
                  {achievement.unlocked && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 rounded-2xl`}></div>
                  )}
                  
                  <div className="relative">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${achievement.color} w-fit mb-4 ${
                      achievement.unlocked ? 'shadow-lg shadow-blue-500/25' : 'opacity-50'
                    }`}>
                      <div className="text-white">{achievement.icon}</div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className={`text-lg font-bold mb-2 ${
                        achievement.unlocked ? 'text-white' : 'text-slate-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{achievement.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className={achievement.unlocked ? 'text-green-400' : 'text-slate-400'}>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                          className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        achievement.unlocked
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                      }`}>
                        {achievement.unlocked ? '🏆 Unlocked' : '🔒 Locked'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {skillsProgress.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                        <div className="text-white">{skill.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
                        <p className="text-slate-400 text-sm">Level {skill.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{skill.experience}</p>
                      <p className="text-slate-400 text-sm">/ {skill.maxExperience} XP</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-slate-700/50 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(skill.experience / skill.maxExperience) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full`}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{Math.round((skill.experience / skill.maxExperience) * 100)}% to Level {skill.level + 1}</span>
                      <span>{skill.maxExperience - skill.experience} XP remaining</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProgressPage;
