import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, HardHat, Building2, Menu, Bell, User, Box, Fingerprint, Users, Wallet } from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Maharashtra PWD</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>DSR 2023-24 Active</div>
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
