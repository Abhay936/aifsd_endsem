import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, PlusCircle, List, Home } from 'lucide-react';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    <span className="bg-blue-600 text-white p-1 rounded-md">AI</span> Complaint System
                </Link>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                        <Home size={18} /> Home
                    </Link>
                    
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            <Link to="/complaints" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                                <List size={18} /> Complaints
                            </Link>
                            <Link to="/complaints/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm shadow-blue-200">
                                <PlusCircle size={18} /> New Complaint
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition flex items-center gap-1"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                            <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
