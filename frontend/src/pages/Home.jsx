import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BrainCircuit } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center mt-12 animate-fade-in">
            <div className="text-center max-w-3xl">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                    Smart Complaint Management <br/> Powered by <span className="text-blue-600">AI</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    Instantly analyze, categorize, and route complaints to the right department using advanced Artificial Intelligence. Resolve issues faster than ever before.
                </p>
                <div className="flex gap-4 justify-center mb-20">
                    <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                        Get Started
                    </Link>
                    <Link to="/login" className="px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition shadow-sm">
                        Login
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <BrainCircuit size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                    <p className="text-gray-600">Automatically summarizes complaints and determines priority level instantly.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Smart Routing</h3>
                    <p className="text-gray-600">Routes issues to the exact department responsible without human intervention.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center text-green-600 mb-6">
                        <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Fast Resolution</h3>
                    <p className="text-gray-600">Auto-generates professional responses, keeping users informed and satisfied.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
