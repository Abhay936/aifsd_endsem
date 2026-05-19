import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
    const [recentComplaints, setRecentComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/complaints');
                const complaints = res.data;
                
                // Filter by user if not admin (if we wanted to implement role-based views)
                const userComplaints = user.role === 'Admin' ? complaints : complaints.filter(c => c.email === user.email);

                const pending = userComplaints.filter(c => c.status === 'Pending').length;
                const resolved = userComplaints.filter(c => c.status === 'Resolved').length;
                
                setStats({
                    total: userComplaints.length,
                    pending,
                    resolved
                });

                setRecentComplaints(userComplaints.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Hello, {user.name}</h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Complaints</p>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                        <AlertCircle size={24} />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Pending</p>
                        <h3 className="text-3xl font-bold text-amber-600">{stats.pending}</h3>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                        <Clock size={24} />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Resolved</p>
                        <h3 className="text-3xl font-bold text-green-600">{stats.resolved}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                        <CheckCircle size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Complaints</h2>
                    <Link to="/complaints" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
                </div>
                
                {recentComplaints.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No complaints found.</p>
                        <Link to="/complaints/new" className="text-blue-600 hover:underline mt-2 inline-block">Create one now</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                                    <th className="pb-3 px-4">Title</th>
                                    <th className="pb-3 px-4">Category</th>
                                    <th className="pb-3 px-4">Priority</th>
                                    <th className="pb-3 px-4">Status</th>
                                    <th className="pb-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentComplaints.map(complaint => (
                                    <tr key={complaint._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4 font-medium text-gray-800">
                                            <Link to={`/complaints/${complaint._id}`} className="hover:text-blue-600">{complaint.title}</Link>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{complaint.category}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                complaint.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                                {complaint.priority || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-500 text-sm">
                                            {new Date(complaint.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
