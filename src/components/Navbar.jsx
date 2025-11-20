import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Code2 } from 'lucide-react';
import '../App.css';

export function Navbar({ onOpenAuth }) {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Code2 className="brand-icon" size={28} />
                    <span className="brand-text">DSA Roadmap</span>
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-menu">
                            <div className="user-info">
                                <User size={18} />
                                <span>{user.username}</span>
                            </div>
                            <button onClick={logout} className="nav-button secondary">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="guest-menu">
                            <button onClick={() => onOpenAuth('login')} className="nav-button ghost">
                                Sign In
                            </button>
                            <button onClick={() => onOpenAuth('register')} className="nav-button primary">
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
