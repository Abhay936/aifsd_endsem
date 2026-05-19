import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, Filter } from 'lucide-react';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const categories = ['All', 'Infrastructure', 'Sanitation', 'Electricity', 'Water', 'Security', 'Other'];

    useEffect(() => {
        fetchComplaints();
    }, [filterCategory, searchTerm]);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            let url = '/complaints?';
            if (searchTerm) url += `location=${searchTerm}&`;
            if (filterCategory && filterCategory !== 'All') url += `category=${filterCategory}&`;
            
            const res = await api.get(url);
            setComplaints(res.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">All Complaints</h1>
                    <p className="text-gray-500 mt-1">Track and manage issues</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by location..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <select 
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white w-full sm:w-48"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
            ) : complaints.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500 text-lg mb-4">No complaints found matching your criteria.</p>
                    <button onClick={() => {setSearchTerm(''); setFilterCategory('All');}} className="text-blue-600 font-medium hover:underline">Clear filters</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map(complaint => (
                        <Link to={`/complaints/${complaint._id}`} key={complaint._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group block">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                    complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {complaint.status}
                                </span>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                                    complaint.priority === 'High' ? 'border-red-200 text-red-600 bg-red-50' :
                                    complaint.priority === 'Medium' ? 'border-amber-200 text-amber-600 bg-amber-50' :
                                    'border-green-200 text-green-600 bg-green-50'
                                }`}>
                                    {complaint.priority} Priority
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition">{complaint.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{complaint.aiSummary || complaint.description}</p>
                            
                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
                                <span className="flex items-center gap-1 font-medium bg-gray-50 px-2 py-1 rounded">
                                    {complaint.department || 'Routing...'}
                                </span>
                                <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintList;
