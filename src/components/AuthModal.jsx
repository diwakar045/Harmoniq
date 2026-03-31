import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, theme }) => {
    const isDark = theme === 'dark';
    const isClassic = theme === 'classic';
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup, loginWithGoogle } = useAuth();
    
    const handleGoogleLogin = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            onClose();
            setUsername('');
            setPassword('');
        } else {
            setError(result.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = isLogin
            ? await login(username, password)
            : await signup(username, password);

        if (result.success) {
            onClose();
            setUsername('');
            setPassword('');
        } else {
            setError(result.message);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        borderRadius: isClassic ? '8px' : '12px',
        backgroundColor: isClassic ? 'rgba(255,238,196,0.05)' : (isDark ? 'rgba(245, 249, 253, 0.09)' : '#F8FAFC'),
        border: isClassic ? '1px solid rgba(255,238,196,0.3)' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
        color: isClassic ? '#ffeec4' : (isDark ? '#f2f2f2' : '#334155'),
        outline: 'none',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
    };

    const labelStyle = {
        fontSize: '0.75rem',
        color: isClassic ? 'rgba(255,238,196,0.7)' : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 41, 59, 0.5)'),
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            theme={theme}
            title={isLogin ? 'Welcome Back' : 'Create Account'}
            footer={(
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: isClassic ? '8px' : '12px',
                            background: 'var(--primary)',
                            color: isClassic ? '#412619' : 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            border: 'none',
                            fontSize: '1rem',
                            transition: 'transform 0.2s ease, opacity 0.2s ease',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {isLogin ? 'Login to Harmoniq' : 'Join Harmoniq'}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: isClassic ? 'rgba(255,238,196,0.2)' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)') }} />
                        <span style={{ fontSize: '0.7rem', color: isClassic ? 'rgba(255,238,196,0.5)' : (isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'), fontWeight: '700', textTransform: 'uppercase' }}>or</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: isClassic ? 'rgba(255,238,196,0.2)' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)') }} />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: isClassic ? '8px' : '12px',
                            background: isClassic ? 'rgba(255,238,196,0.1)' : 'white',
                            color: isClassic ? '#ffeec4' : '#334155',
                            cursor: 'pointer',
                            fontWeight: '600',
                            border: isClassic ? '1px solid rgba(255,238,196,0.3)' : (isDark ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.2s ease',
                            boxShadow: isClassic ? 'none' : (isDark ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'),
                            fontSize: '1rem'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.backgroundColor = isClassic ? 'rgba(255,238,196,0.2)' : '#f8fafc';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.backgroundColor = isClassic ? 'rgba(255,238,196,0.1)' : 'white';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        Continue with Google
                    </button>
                </div>
            )}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        style={inputStyle}
                        onFocus={e => {
                            e.currentTarget.style.backgroundColor = isClassic ? 'rgba(255,238,196,0.1)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff');
                            e.currentTarget.style.borderColor = isClassic ? '#ffeec4' : 'var(--primary)';
                            e.currentTarget.style.boxShadow = isClassic ? '0 0 0 4px rgba(255,238,196,0.1)' : `0 0 0 4px rgba(255, 161, 79, 0.1)`;
                        }}
                        onBlur={e => {
                            e.currentTarget.style.backgroundColor = inputStyle.backgroundColor;
                            const borderStyle = inputStyle.border;
                            e.currentTarget.style.borderColor = borderStyle ? (borderStyle.split(' ')[2] || borderStyle) : 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={inputStyle}
                        onFocus={e => {
                            e.currentTarget.style.backgroundColor = isClassic ? 'rgba(255,238,196,0.1)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff');
                            e.currentTarget.style.borderColor = isClassic ? '#ffeec4' : 'var(--primary)';
                            e.currentTarget.style.boxShadow = isClassic ? '0 0 0 4px rgba(255,238,196,0.1)' : `0 0 0 4px rgba(255, 161, 79, 0.1)`;
                        }}
                        onBlur={e => {
                            e.currentTarget.style.backgroundColor = inputStyle.backgroundColor;
                            const borderStyle = inputStyle.border;
                            e.currentTarget.style.borderColor = borderStyle ? (borderStyle.split(' ')[2] || borderStyle) : 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {error && (
                    <div style={{
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        borderRadius: '8px',
                        fontWeight: '500'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: isClassic ? 'rgba(255,238,196,0.7)' : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 41, 59, 0.6)') }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: isClassic ? '#ffeec4' : 'var(--primary)', cursor: 'pointer', fontWeight: '700' }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AuthModal;
