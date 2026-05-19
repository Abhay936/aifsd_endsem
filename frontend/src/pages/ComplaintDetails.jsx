import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { MapPin, User, Tag, Clock, Bot, Sparkles, Building2, Trash2 } from 'lucide-react';

const ComplaintDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusUpdating, setStatusUpdating] = useState(false);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const res = await api.get(`/complaints/${id}`);
                setComplaint(res.data);
            } catch (err) {
                setError('Failed to fetch complaint details');
            } finally {
                setLoading(false);
            }
        };
        fetchComplaint();
    }, [id]);

    const handleStatusUpdate = async (newStatus) => {
        setStatusUpdating(true);
        try {
            const res = await api.put(`/complaints/${id}`, { status: newStatus });
            setComplaint(res.data);
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleDelete = async () => {
        if(window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                await api.delete(`/complaints/${id}`);
                navigate('/complaints');
            } catch (err) {
                alert('Failed to delete complaint');
            }
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-medium">{error}</div>;
    if (!complaint) return null;

    const isAdmin = user?.role === 'Admin';
    const isOwner = user?.email === complaint.email;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-800'
                        }`}>
                            {complaint.status}
                        </span>
                        <span className="text-gray-400 text-sm">{new Date(complaint.createdAt).toLocaleString()}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{complaint.title}</h1>
                </div>
                
                {(isAdmin || isOwner) && (
                    <button 
                        onClick={handleDelete}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete Complaint"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{complaint.description}</p>
                    </div>

                    {/* AI Analysis Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Bot size={100} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <Sparkles size={20} className="text-blue-600" />
                                AI Analysis Results
                            </h3>
                            
                            <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                <div className="bg-white/60 p-4 rounded-xl border border-white">
                                    <p className="text-sm text-blue-600 font-medium mb-1">Detected Priority</p>
                                    <p className={`font-bold text-lg ${
                                        complaint.priority === 'High' ? 'text-red-600' :
                                        complaint.priority === 'Medium' ? 'text-amber-600' :
                                        'text-green-600'
                                    }`}>{complaint.priority || 'Not detected'}</p>
                                </div>
                                <div className="bg-white/60 p-4 rounded-xl border border-white">
                                    <p className="text-sm text-blue-600 font-medium mb-1">Recommended Department</p>
                                    <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                        <Building2 size={18} className="text-blue-500" />
                                        {complaint.department || 'General'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white/60 p-4 rounded-xl border border-white mb-4">
                                <p className="text-sm text-blue-600 font-medium mb-1">AI Summary</p>
                                <p className="text-gray-800 font-medium">{complaint.aiSummary || 'No summary available.'}</p>
                            </div>
                            
                            <div className="bg-white/80 p-4 rounded-xl border border-blue-200">
                                <p className="text-sm text-blue-600 font-medium mb-1">Auto-Response to User</p>
                                <p className="text-gray-700 italic">"{complaint.aiResponse || 'Thank you for your submission.'}"</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Details</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="text-gray-400 mt-0.5" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Reported By</p>
                                    <p className="font-medium text-gray-800">{complaint.name}</p>
                                    <p className="text-sm text-gray-500">{complaint.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Tag className="text-gray-400 mt-0.5" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium text-gray-800">{complaint.category}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="text-gray-400 mt-0.5" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium text-gray-800">{complaint.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(isAdmin || isOwner) && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Actions</h3>
                            
                            {complaint.status === 'Pending' ? (
                                <button 
                                    disabled={statusUpdating}
                                    onClick={() => handleStatusUpdate('Resolved')}
                                    className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                                >
                                    {statusUpdating ? 'Updating...' : 'Mark as Resolved'}
                                </button>
                            ) : (
                                <button 
                                    disabled={statusUpdating}
                                    onClick={() => handleStatusUpdate('Pending')}
                                    className="w-full bg-amber-500 text-white py-2.5 rounded-lg font-medium hover:bg-amber-600 transition"
                                >
                                    {statusUpdating ? 'Updating...' : 'Reopen Complaint'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
