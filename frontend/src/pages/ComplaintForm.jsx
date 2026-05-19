import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Bot, Send, Loader2 } from 'lucide-react';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Infrastructure',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const categories = ['Infrastructure', 'Sanitation', 'Electricity', 'Water', 'Security', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/complaints', formData);
            // Navigate to the newly created complaint details page
            navigate(`/complaints/${res.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting complaint');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Register Complaint</h2>
                        <p className="text-gray-500 text-sm">AI will analyze and route your issue instantly.</p>
                    </div>
                </div>
                
                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Brief summary of the issue (e.g., Water leakage in block A)"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                            name="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                            type="text" 
                            name="location"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Where is this happening? (e.g., 2nd Floor, Building C)"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            name="description"
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide as much detail as possible..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-4 ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                AI is analyzing...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Submit Complaint
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintForm;
