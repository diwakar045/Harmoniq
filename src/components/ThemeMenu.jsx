import React from 'react';

const ThemeMenu = ({ currentTheme, onSelect, onClose }) => {
    const themes = [
        {
            id: 'minimal', name: 'Piano'
        },
        {
            id: 'classic', name: 'Harmonium'
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100%',
            color: 'var(--panel-text)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500', color: 'var(--panel-text)' }}>Choose Theme</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--panel-text-dim)',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--panel-text-dim)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>
                    Appearance
                </div>
                {themes.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => onSelect(theme.id)}
                        style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: currentTheme === theme.id ? 'rgba(255, 161, 79, 0.1)' : 'var(--panel-item-bg)',
                            border: 'none',
                            color: currentTheme === theme.id ? 'var(--primary)' : 'var(--panel-text)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '0.95rem',
                            fontWeight: currentTheme === theme.id ? '500' : '500',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            if (currentTheme !== theme.id) e.currentTarget.style.backgroundColor = 'var(--panel-item-hover)';
                        }}
                        onMouseOut={(e) => {
                            if (currentTheme !== theme.id) e.currentTarget.style.backgroundColor = 'var(--panel-item-bg)';
                        }}
                    >
                        {theme.icon}
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeMenu;
