import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { FileText, Plus } from 'lucide-react';

export default function Planning() {
  const { projects, addProject } = useAppState();
  const [activeTab, setActiveTab] = useState('projects');
  const [projectName, setProjectName] = useState('');
  const [reraId, setReraId] = useState('');

  const submitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName) return;
    addProject({
      name: projectName,
      reraId: reraId || 'Pending',
      budget: 50000000,
      spent: 0,
      status: 'Planning',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2028-12-31'
    });
    alert(`RERA Registration for ${projectName} submitted successfully!`);
    setProjectName('');
    setReraId('');
    setActiveTab('projects');
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Planning & MahaRERA</h1>
          <p className="page-description">Project registration, timelines, and statutory compliance tracking.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('registration')}><Plus size={16} /> New Project</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'projects' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'projects' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'projects' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('projects')}> Active Projects </button>
        <button className={`btn ${activeTab === 'registration' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'registration' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'registration' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('registration')}> RERA Registration </button>
      </div>

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1">
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Project Timelines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map(p => (
                <div key={p.id} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{p.name}</h4>
                      <span className={`status-badge ${p.status === 'Completed' ? 'success' : (p.status === 'Active' ? 'info' : 'warning')}`}>MahaRERA: {p.reraId}</span>
                    </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                       <div style={{ backgroundColor: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Approved Budget</p>
                          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>₹{(p.budget/10000000).toFixed(2)} Cr</p>
                       </div>
                       <div style={{ backgroundColor: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Actual Spent</p>
                          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>₹{(p.spent/10000000).toFixed(2)} Cr</p>
                       </div>
                       <div style={{ backgroundColor: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>RERA Registration</p>
                          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{p.reraId}</p>
                       </div>
                     </div>
                     
                     <div style={{ marginTop: '1.5rem', height: '200px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                       {p.id === 'p3' ? (
                          <iframe src="https://www.google.com/maps?q=19.950782,73.489393&output=embed" width="100%" height="200" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                       ) : p.id === 'p1' ? (
                          <iframe src="https://www.google.com/maps?q=20.017817,73.760508&output=embed" width="100%" height="200" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                       ) : (
                          <iframe src="https://www.google.com/maps?q=Ragrang+CHS+project,+Nashik&output=embed" width="100%" height="200" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                       )}
                     </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Target completion: {p.endDate} • Status: {p.status}</p>
                    
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.progress > 85 ? 'var(--accent-success)' : 'var(--accent-primary)', borderRadius: 'var(--radius-full)' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      <span style={{ color: p.progress > 0 ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: p.progress > 0 ? 600 : 400 }}>Substructure</span>
                      <span style={{ color: p.progress > 15 ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: p.progress > 15 ? 600 : 400 }}>Superstructure</span>
                      <span style={{ color: p.progress > 50 ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: p.progress > 50 ? 600 : 400 }}>{p.currentStage}</span>
                      <span style={{ color: p.progress >= 100 ? 'var(--accent-success)' : 'var(--text-muted)', fontWeight: p.progress >= 100 ? 600 : 400 }}>Completion</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary">Update Phase</button>
                    <button className="btn btn-primary">Form 3 Update</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'registration' && (
        <div className="grid grid-cols-1">
          <div className="card glass-panel" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <FileText size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>New MahaRERA Project Entry</h3>
            </div>
            
            <form onSubmit={submitProject}>
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Project Name</label>
                  <input type="text" className="input-field" placeholder="e.g. Skyline Towers" value={projectName} onChange={e => setProjectName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Promoter Name / Org</label>
                  <input type="text" className="input-field" placeholder="Chavda Builders" disabled />
                </div>
                
                <div className="input-group">
                  <label className="input-label">RERA Registration No (Optional)</label>
                  <input type="text" className="input-field" placeholder="Leave blank if pending" value={reraId} onChange={e => setReraId(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Project Type</label>
                  <select className="input-field">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Mixed Use</option>
                    <option>Plotted Development</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Total Plot Area (Sq.Mtr)</label>
                  <input type="number" className="input-field" placeholder="0.00" />
                </div>
                <div className="input-group">
                  <label className="input-label">Proposed FSI</label>
                  <input type="number" className="input-field" placeholder="As per Sanction Plan" />
                </div>
              </div>

              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label className="input-label">Upload Commencement Certificate (CC)</label>
                <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', position: 'relative' }}>
                  <FileText size={32} style={{ marginBottom: '0.5rem', opacity: 0.5, margin: '0 auto' }} />
                  <p>Click to select PDF or Image</p>
                  <input type="file" accept=".pdf,image/*" style={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', cursor: 'pointer' }} onChange={(e) => {
                     if (e.target.files && e.target.files[0]) {
                        alert(`File "${e.target.files[0].name}" attached successfully!`);
                     }
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary">Save Draft</button>
                <button type="submit" className="btn btn-primary">Submit to Registry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
