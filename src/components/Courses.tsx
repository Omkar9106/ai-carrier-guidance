'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  author: string;
  image: string;
}

const Courses: React.FC = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const carouselRef = useRef<HTMLDivElement>(null);

    // Sample data - you can expand this
    const learningWebsites = [
        { name: 'Coursera', url: 'https://www.coursera.org', logo: '/coursera.png' },
        { name: 'edX', url: 'https://www.edx.org', logo: '/edx.png' },
        { name: 'Udemy', url: 'https://www.udemy.com', logo: '/udemy.png' },
        { name: 'Pluralsight', url: 'https://www.pluralsight.com', logo: '/pluralsight.png' },
    ];

    const courses: Course[] = [
        {
            id: 1,
            title: 'Artificial Intelligence Full Course',
            description: 'Comprehensive AI course covering fundamentals to advanced concepts.',
            level: 'Beginner',
            duration: '10 hours',
            author: 'Intellipaat',
            image: '/ai-course.jpg'
        },
        {
            id: 2,
            title: 'Machine Learning A-Z',
            description: 'Complete ML guide with hands-on projects and real-world applications.',
            level: 'Intermediate',
            duration: '42 hours',
            author: 'Kirill Eremenko',
            image: '/ml-course.jpg'
        },
        {
            id: 3,
            title: 'Deep Learning Specialization',
            description: 'Master deep learning fundamentals and neural networks.',
            level: 'Advanced',
            duration: '3 months',
            author: 'Andrew Ng',
            image: '/dl-course.jpg'
        },
        {
            id: 4,
            title: 'Python for Data Science',
            description: 'Learn Python programming with focus on data analysis and visualization.',
            level: 'Beginner',
            duration: '25 hours',
            author: 'Jose Portilla',
            image: '/python-course.jpg'
        },
        {
            id: 5,
            title: 'Web Development Bootcamp',
            description: 'Complete web development with React, Node.js and modern tools.',
            level: 'Intermediate',
            duration: '65 hours',
            author: 'Colt Steele',
            image: '/web-course.jpg'
        },
        {
            id: 6,
            title: 'Cloud Computing AWS',
            description: 'Master AWS cloud services and deployment strategies.',
            level: 'Advanced',
            duration: '40 hours',
            author: 'Stephane Maarek',
            image: '/aws-course.jpg'
        }
    ];

    const filteredCourses = courses.filter(course => 
        (filter === 'All' || course.level === filter) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Auto-scrolling effect for the carousel
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let scrollInterval: NodeJS.Timeout;
        
        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
                    carousel.scrollLeft = 0;
                } else {
                    carousel.scrollLeft += 0.5;
                }
            }, 20);
        };

        startScrolling();
        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Learning Resources
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Discover top learning platforms and advance your skills with curated courses
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <button 
                            onClick={() => setActiveTab('courses')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                activeTab === 'courses' 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            Courses
                        </button>
                        <button 
                            onClick={() => setActiveTab('jobs')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                activeTab === 'jobs' 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            Jobs
                        </button>
                    </div>
                </div>

                {activeTab === 'courses' && (
                    <>
                        {/* Search and Filter */}
                        <div className="mb-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all duration-300 text-lg"
                                    />
                                </div>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setFilter(level)}
                                            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                                                filter === level 
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Learning Platforms */}
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4">Top Learning Platforms</h2>
                                <p className="text-slate-400 max-w-2xl mx-auto">
                                    Access world-class courses from leading online education platforms
                                </p>
                            </div>
                            <div 
                                ref={carouselRef}
                                className="flex gap-8 overflow-x-auto py-8 px-4 scrollbar-hide"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {[...learningWebsites, ...learningWebsites].map((site, index) => (
                                    <a
                                        key={`${site.name}-${index}`}
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-none group"
                                    >
                                        <div className="w-64 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50">
                                            <div className="flex flex-col items-center text-center gap-4">
                                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg">
                                                    <span className="text-3xl font-bold text-white">{site.name[0]}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white mb-2">{site.name}</h3>
                                                    <p className="text-slate-400 text-sm">Click to explore courses</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Empty State */}
                        <div className="text-center py-16">
                            <div className="max-w-2xl mx-auto">
                                <div className="h-32 w-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-5xl">📚</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Start Your Learning Journey</h3>
                                <p className="text-slate-400 text-lg mb-8">
                                    Explore the top learning platforms above to discover courses that match your interests and career goals.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                                        <div className="text-3xl mb-3">🎯</div>
                                        <h4 className="font-semibold mb-2">Set Goals</h4>
                                        <p className="text-slate-400 text-sm">Define your learning objectives</p>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                                        <div className="text-3xl mb-3">📖</div>
                                        <h4 className="font-semibold mb-2">Learn Daily</h4>
                                        <p className="text-slate-400 text-sm">Build consistent study habits</p>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                                        <div className="text-3xl mb-3">🏆</div>
                                        <h4 className="font-semibold mb-2">Achieve Success</h4>
                                        <p className="text-slate-400 text-sm">Reach your career aspirations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'jobs' && (
                    <>
                        {/* Job Platforms */}
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4">Top Job Platforms</h2>
                                <p className="text-slate-400 max-w-2xl mx-auto">
                                    Find your dream job from leading career platforms worldwide
                                </p>
                            </div>
                            <div className="flex gap-8 overflow-x-auto py-8 px-4 scrollbar-hide">
                                {[
                                    { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs' },
                                    { name: 'Indeed', url: 'https://www.indeed.com' },
                                    { name: 'Glassdoor', url: 'https://www.glassdoor.com' },
                                    { name: 'AngelList', url: 'https://angel.co' }
                                ].map((site) => (
                                    <a
                                        key={site.name}
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-none group"
                                    >
                                        <div className="w-64 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50">
                                            <div className="flex flex-col items-center text-center gap-4">
                                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center group-hover:from-green-400 group-hover:to-blue-500 transition-all duration-300 shadow-lg">
                                                    <span className="text-3xl font-bold text-white">{site.name[0]}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white mb-2">{site.name}</h3>
                                                    <p className="text-slate-400 text-sm">Find your next opportunity</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Job Categories */}
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4">Popular Job Categories</h2>
                                <p className="text-slate-400 max-w-2xl mx-auto">
                                    Explore in-demand roles across different tech domains
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'Software Development', count: '12,543 jobs', icon: '💻' },
                                    { title: 'Data Science', count: '8,234 jobs', icon: '📊' },
                                    { title: 'AI/ML Engineering', count: '5,892 jobs', icon: '🤖' },
                                    { title: 'Web Development', count: '10,123 jobs', icon: '🌐' },
                                    { title: 'DevOps', count: '4,567 jobs', icon: '⚙️' },
                                    { title: 'UI/UX Design', count: '3,456 jobs', icon: '🎨' }
                                ].map((category, index) => (
                                    <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-4xl">{category.icon}</span>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                                                <p className="text-slate-400 text-sm">{category.count}</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                                            Explore Jobs
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Job Search Tips */}
                        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-blue-500/20">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4">Job Search Tips</h2>
                                <p className="text-slate-400 max-w-2xl mx-auto">
                                    Expert advice to help you land your dream job
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">📝</span> Update Your Resume
                                    </h3>
                                    <p className="text-slate-300">Tailor your resume for each application and highlight relevant skills and achievements.</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🎯</span> Target Right Companies
                                    </h3>
                                    <p className="text-slate-300">Research companies that align with your career goals and values.</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🤝</span> Network Actively
                                    </h3>
                                    <p className="text-slate-300">Connect with professionals in your field through LinkedIn and industry events.</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">📚</span> Keep Learning
                                    </h3>
                                    <p className="text-slate-300">Stay updated with latest skills and technologies in your domain.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Courses;
