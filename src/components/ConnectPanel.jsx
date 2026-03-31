import React from 'react';

const SocialLink = ({ icon: Icon, label, href, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '1rem',
            borderRadius: '12px',
            background: 'var(--panel-item-bg)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--panel-item-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--panel-item-hover)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.background = 'var(--panel-item-bg)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--panel-item-bg)';
        }}
    >
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color + '20', // Add transparency
            color: color
        }}>
            <Icon size={20} strokeWidth={2} />
        </div>
        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{label}</span>
        <svg
            style={{ marginLeft: 'auto', opacity: 0.5 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
    </a>
);

const ConnectPanel = ({ onClose }) => {
    // Simple Icons
    const TwitterIcon = ({ size, strokeWidth }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );

    const DiscordIcon = ({ size, strokeWidth }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 10L9.01 10" /><path d="M15 10L15.01 10" />
            <path d="M7 15C7 15 8.5 17 12 17C15.5 17 17 15 17 15" />
            <path d="M21 11.5c0-2.8-2-5.1-4.7-5.5-1.5-.2-2.9-.1-4.3-.1s-2.8-.1-4.3.1C5 6.4 3 8.7 3 11.5c0 1.9 1 3.6 2.6 4.6l-1 2.9h14.8l-1-2.9C20 15.1 21 13.4 21 11.5z" />
        </svg>
    );

    const GithubIcon = ({ size, strokeWidth }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    );

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
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500', color: 'var(--panel-text)' }}>Connect</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--panel-text-dim)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>

            <div style={{
                fontSize: '0.9rem',
                color: 'var(--panel-text-dim)',
                lineHeight: '1.6',
                marginBottom: '0.5rem'
            }}>
                Join our community and follow the development of Harmoniq.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <SocialLink
                    icon={TwitterIcon}
                    label="Follow on Twitter"
                    href="https://twitter.com"
                    color="#1DA1F2"
                />
                <SocialLink
                    icon={DiscordIcon}
                    label="Join Discord"
                    href="https://discord.com"
                    color="#5865F2"
                />
                <SocialLink
                    icon={GithubIcon}
                    label="Star on GitHub"
                    href="https://github.com"
                    color="#fff"
                />
            </div>
        </div>
    );
};

export default ConnectPanel;
