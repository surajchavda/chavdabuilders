import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, HardHat, Building2, Menu, Bell, User, Box, Fingerprint, Users, Wallet, Palette } from 'lucide-react';

type ThemeKey = 'dark' | 'white' | 'apple' | 'glassy';

interface ThemeOption {
  key: ThemeKey;
  label: string;
  swatch: string;       // main preview color
  swatchBorder: string;  // border for the swatch
}

const themes: ThemeOption[] = [
  { key: 'dark',   label: 'Dark',   swatch: '#181b21', swatchBorder: '#2b303b' },
  { key: 'white',  label: 'White',  swatch: '#f8fafc', swatchBorder: '#e2e8f0' },
  { key: 'apple',  label: 'Apple',  swatch: '#f5f5f7', swatchBorder: '#d2d2d7' },
  { key: 'glassy', label: 'Glassy', swatch: '#0c0e1a', swatchBorder: '#818cf8' },
];

function applyTheme(theme: ThemeKey) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cb-theme', theme);
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeKey>(() => {
    return (localStorage.getItem('cb-theme') as ThemeKey) || 'dark';
  });
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const location = useLocation();

  // Apply theme on mount and when changed
  useEffect(() => {
    applyTheme(activeTheme);
  }, [activeTheme]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleThemeChange = (theme: ThemeKey) => {
    setActiveTheme(theme);
    setThemePanelOpen(false);
  };

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'AI Dashboard' },
    { to: '/planning', icon: <Building2 size={20} />, label: 'Planning & RERA' },
    { to: '/materials', icon: <Box size={20} />, label: 'Materials & GRN' },
    { to: '/labour', icon: <Fingerprint size={20} />, label: 'Labour & Punch' },
    { to: '/execution', icon: <HardHat size={20} />, label: 'Site Execution' },
    { to: '/subcontractors', icon: <Users size={20} />, label: 'Subcontractors' },
    { to: '/finance', icon: <Wallet size={20} />, label: 'Finance & P&L' },
  ];

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ background: 'var(--accent-primary)', width: '32px', height: '32px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
            <Building2 size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>Chavda Builders</span>
        </div>
        
        <nav style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Modules</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                fontWeight: isActive ? 500 : 400,
                transition: 'all var(--transition-fast)',
                textDecoration: 'none'
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Theme Switcher + PWD Info */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
          {/* Theme Selector Toggle */}
          <button
            onClick={() => setThemePanelOpen(!themePanelOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 500,
              marginBottom: themePanelOpen ? '0.75rem' : '1rem'
            }}
          >
            <Palette size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: 'left' }}>Theme</span>
            <span style={{
              fontSize: '0.6875rem',
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface-hover)',
              color: 'var(--text-secondary)',
              textTransform: 'capitalize'
            }}>
              {activeTheme}
            </span>
          </button>

          {/* Theme Options Panel */}
          <div style={{
            maxHeight: themePanelOpen ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease',
            opacity: themePanelOpen ? 1 : 0,
            marginBottom: themePanelOpen ? '1rem' : '0'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
            }}>
              {themes.map(t => {
                const isActive = activeTheme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => handleThemeChange(t.key)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.625rem 0.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: isActive ? `2px solid var(--accent-primary)` : '1px solid var(--border-color)',
                      background: isActive ? 'var(--bg-surface-hover)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: t.key === 'glassy'
                        ? 'linear-gradient(135deg, #0c0e1a 0%, #1e243c 50%, #818cf8 100%)'
                        : t.key === 'apple'
                        ? 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #0071e3 100%)'
                        : t.swatch,
                      border: `2px solid ${t.swatchBorder}`,
                      boxShadow: isActive ? `0 0 0 2px var(--accent-primary), 0 0 8px var(--accent-glow)` : 'none',
                      transition: 'box-shadow 150ms ease',
                    }} />
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.125rem' }}>Maharashtra PWD</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>DSR 2023-24 Active</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-icon-only" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <span style={{ fontWeight: 500, fontFamily: 'Outfit, sans-serif' }} className="desktop-title">Construction HQ</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
              <span className="status-badge success">Live</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sync Active</span>
            </div>
            <button className="btn-icon-only">
              <Bell size={20} />
            </button>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="var(--text-secondary)" />
            </div>
          </div>
        </header>

        {/* Page Area */}
        <Outlet />
      </main>
    </div>
  );
}
