'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Settings, 
  Edit2,
  Save,
  X,
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Trophy,
  Clock,
  CheckCircle,
  BarChart3,
  Zap
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  education: string;
  joinDate: string;
  avatar: string;
  stats: {
    totalQuizzes: number;
    averageScore: number;
    streakDays: number;
    totalHours: number;
    achievements: number;
    coursesCompleted: number;
  };
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate learner and technology enthusiast. Always looking to expand my knowledge and skills.',
    location: 'San Francisco, CA',
    occupation: 'Software Developer',
    education: 'Bachelor of Science in Computer Science',
    joinDate: 'January 2024',
    avatar: '',
    stats: {
      totalQuizzes: 23,
      averageScore: 87,
      streakDays: 5,
      totalHours: 12,
      achievements: 4,
      coursesCompleted: 8
    }
  });

  const [editForm, setEditForm] = useState<UserProfile>(profile);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            My Profile
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Manage your profile and track your learning journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          {/* Profile Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="Bio"
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    value={editForm.occupation}
                    onChange={(e) => setEditForm({...editForm, occupation: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Occupation"
                  />
                  <input
                    type="text"
                    value={editForm.education}
                    onChange={(e) => setEditForm({...editForm, education: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Education"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-slate-700 text-white py-2 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white text-center">{profile.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <p className="text-slate-300 text-center">{profile.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{profile.occupation}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">{profile.education}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined {profile.joinDate}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats and Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Target className="w-5 h-5" />,
                  label: "Total Quizzes",
                  value: profile.stats.totalQuizzes,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <TrendingUp className="w-5 h-5" />,
                  label: "Average Score",
                  value: `${profile.stats.averageScore}%`,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "Learning Streak",
                  value: `${profile.stats.streakDays} days`,
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "Learning Hours",
                  value: `${profile.stats.totalHours}h`,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Trophy className="w-5 h-5" />,
                  label: "Achievements",
                  value: profile.stats.achievements,
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  label: "Courses",
                  value: profile.stats.coursesCompleted,
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} w-fit mb-3`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <h3 className="text-slate-400 text-xs font-medium mb-1">{stat.label}</h3>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Achievements */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Quick Starter",
                    description: "Completed your first quiz",
                    date: "2 days ago",
                    icon: <Zap className="w-5 h-5" />,
                    color: "text-yellow-400"
                  },
                  {
                    title: "Perfect Score",
                    description: "Achieved 100% on JavaScript quiz",
                    date: "1 week ago",
                    icon: <Star className="w-5 h-5" />,
                    color: "text-green-400"
                  },
                  {
                    title: "Learning Streak",
                    description: "5 days consecutive learning",
                    date: "2 weeks ago",
                    icon: <Clock className="w-5 h-5" />,
                    color: "text-orange-400"
                  }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30"
                  >
                    <div className={`p-3 rounded-lg bg-slate-700/50 ${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{achievement.title}</h4>
                      <p className="text-slate-400 text-sm">{achievement.description}</p>
                    </div>
                    <span className="text-slate-500 text-sm">{achievement.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                Learning Progress
              </h3>
              <div className="space-y-4">
                {[
                  { skill: "JavaScript", progress: 75, color: "from-yellow-400 to-amber-500" },
                  { skill: "React", progress: 60, color: "from-cyan-400 to-blue-500" },
                  { skill: "Python", progress: 85, color: "from-green-400 to-emerald-500" },
                  { skill: "Data Science", progress: 45, color: "from-purple-400 to-pink-500" }
                ].map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{skill.skill}</span>
                      <span className="text-slate-400">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;