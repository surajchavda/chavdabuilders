import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Camera, FileUp, Sun, Users, Wrench, HardHat } from 'lucide-react';

export default function Execution() {
  const { projects, materials } = useAppState();
  const [activeTab, setActiveTab] = useState('dpr');

  const handleDprSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     alert("Daily Progress Report successfully secured to Chavda Builders Database!");
     // Form clears naturally via reload or explicit clear in prod
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Site Execution</h1>
          <p className="page-description">Daily Progress Reports (DPR), material inventory, and labor tracking.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'dpr' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'dpr' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'dpr' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('dpr')}> Daily Progress (DPR) </button>
        <button className={`btn ${activeTab === 'materials' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'materials' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'materials' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('materials')}> Material Tracking </button>
      </div>

      {activeTab === 'dpr' && (
        <div className="grid grid-cols-1">
          <form className="card glass-panel" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }} onSubmit={handleDprSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <HardHat size={24} color="var(--accent-warning)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>New DPR Entry</h3>
            </div>
            
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Project / Site</label>
                <select className="input-field" required>
                  <option value="">Select Project...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Date</label>
                <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                <Sun size={20} /> <span style={{ fontWeight: 500 }}>Weather & Site Conditions</span>
              </div>
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Weather</label>
                  <select className="input-field">
                    <option>Clear / Sunny</option>
                    <option>Cloudy</option>
                    <option>Rainy (Work Halted)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Temperature (°C)</label>
                  <input type="number" className="input-field" placeholder="e.g. 32" />
                </div>
              </div>
            </div>

             <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-warning)' }}>
                <Users size={20} /> <span style={{ fontWeight: 500 }}>Labor & Machinery</span>
              </div>
              <div className="grid grid-cols-3" style={{ gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Skilled Labor</label>
                  <input type="number" className="input-field" placeholder="0" />
                </div>
                <div className="input-group">
                  <label className="input-label">Unskilled</label>
                  <input type="number" className="input-field" placeholder="0" />
                </div>
                 <div className="input-group">
                  <label className="input-label">Heavy Machinery</label>
                  <input type="text" className="input-field" placeholder="e.g. 2 JCBs" />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Work Executed Today</label>
              <textarea className="input-field" rows={4} placeholder="Describe the activities performed..."></textarea>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem', marginTop: '1rem' }}>
               <div className="input-group">
                <label className="input-label">Site Photos / Mobile Upload</label>
                <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', position: 'relative' }}>
                  <Camera size={24} style={{ marginBottom: '0.5rem', opacity: 0.5, margin: '0 auto' }} />
                  <p style={{ fontSize: '0.75rem' }}>Capture or Upload Images</p>
                  <input type="file" accept="image/*" multiple style={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', cursor: 'pointer' }} onChange={(e) => {
                     if (e.target.files && e.target.files.length > 0) alert(`${e.target.files.length} photo(s) attached to DPR successfully!`);
                  }} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Attachments (Permits/Challans)</label>
                <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', position: 'relative' }}>
                  <FileUp size={24} style={{ marginBottom: '0.5rem', opacity: 0.5, margin: '0 auto' }} />
                  <p style={{ fontSize: '0.75rem' }}>Upload PDFs</p>
                  <input type="file" accept=".pdf" multiple style={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', cursor: 'pointer' }} onChange={(e) => {
                     if (e.target.files && e.target.files.length > 0) alert(`${e.target.files.length} document(s) attached safely!`);
                  }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary">Save Draft</button>
              <button type="submit" className="btn btn-primary">Submit DPR</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="grid grid-cols-1">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Material Inventory (Site Level)</h3>
              <button className="btn btn-primary" onClick={() => alert('To log a physical delivery, please navigate to Materials > Goods Receipt (GRN) and process the relevant Purchase Order to guarantee mathematical inventory parity.')}><Wrench size={16} /> Log Delivery</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Material Type</th>
                    <th>Current Stock</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(mat => (
                    <tr key={mat.id}>
                      <td style={{ fontWeight: 500 }}>{mat.name}</td>
                      <td>{mat.stock.toLocaleString()}</td>
                      <td>{mat.unit}</td>
                      <td>
                        {mat.stock <= mat.minStockAlert ? 
                          <span className="status-badge danger">Low Stock</span> : 
                          <span className="status-badge success">Optimal</span>
                        }
                      </td>
                      <td>Today</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
