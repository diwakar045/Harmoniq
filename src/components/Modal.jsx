import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, footer, theme }) => {
    const isDark = theme === 'dark';
    const isClassic = theme === 'classic';

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000, // Higher than profile overlay
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: isClassic ? 'rgb(65, 38, 25)' : (isDark ? '#13141F' : '#ffffff'),
                width: '100%',
                maxWidth: '450px',
                borderRadius: isClassic ? '8px' : '24px',
                border: isClassic ? '1px solid rgba(255,238,196,0.44)' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'),
                boxShadow: isClassic 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    : (isDark
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'),
                padding: '2rem',
                position: 'relative',
                animation: 'modalSlideIn 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                color: isClassic ? 'rgba(255,238,196,0.9)' : (isDark ? '#f2f2f2' : '#1e293b'),
                transition: 'all 0.3s ease'
            }} onClick={e => e.stopPropagation()}>
                <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: isClassic ? '#ffeec4' : (isDark ? '#f2f2f2' : '#1e293b'), margin: 0 }}>{title}</h3>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        color: isClassic ? 'rgba(255,238,196,0.4)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'),
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '4px',
                        lineHeight: 1,
                        transition: 'color 0.2s'
                    }}
                        onMouseOver={e => e.currentTarget.style.color = isClassic ? '#ffeec4' : (isDark ? '#fff' : '#000')}
                        onMouseOut={e => e.currentTarget.style.color = isClassic ? 'rgba(255,238,196,0.4)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)')}
                    >×</button>
                </header>

                <main style={{ marginBottom: '2rem' }}>
                    {children}
                </main>

                {footer && (
                    <footer style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        {footer}
                    </footer>
                )}

                <style>{`
                    @keyframes modalSlideIn {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Modal;
