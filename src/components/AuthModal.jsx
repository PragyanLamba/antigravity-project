import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import '../App.css';

export function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode); // 'login' or 'register'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const { login, register } = useAuth();

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            resetForm();
        }
    }, [isOpen, initialMode]);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        setGeneralError('');
    };

    const validate = () => {
        const newErrors = {};

        // Username validation (simple check for now, could be email)
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation (only for register)
        if (mode === 'register' && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');

        if (!validate()) return;

        let result;
        if (mode === 'login') {
            result = await login(username, password);
        } else {
            result = await register(username, password);
        }

        if (result.success) {
            if (mode === 'register') {
                // Auto login after register or switch to login? 
                // For now, let's switch to login mode and show success message
                setMode('login');
                setGeneralError('Registration successful! Please log in.');
                // Alternatively, auto-login:
                // await login(username, password);
                // onClose();
            } else {
                onClose();
            }
        } else {
            setGeneralError(result.message || 'Authentication failed');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => setMode('login')}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => setMode('register')}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="auth-body">
                    <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="auth-subtitle">
                        {mode === 'login'
                            ? 'Enter your credentials to access your roadmap.'
                            : 'Join us to track your DSA progress.'}
                    </p>

                    {generalError && (
                        <div className={`alert ${generalError.includes('successful') ? 'alert-success' : 'alert-error'}`}>
                            {generalError.includes('successful') ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            <span>{generalError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={errors.username ? 'input-error' : ''}
                                placeholder="Enter your username"
                            />
                            {errors.username && <span className="error-text">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={errors.password ? 'input-error' : ''}
                                placeholder="Enter your password"
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        {mode === 'register' && (
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={errors.confirmPassword ? 'input-error' : ''}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                        )}

                        <button type="submit" className="cta-button full-width">
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
