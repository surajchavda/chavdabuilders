import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { MapPin, HandCoins, CheckCircle, Fingerprint } from 'lucide-react';

export default function Labour() {
  const { workers, projects, punchAttendance, addWorker } = useAppState();
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedSite, setSelectedSite] = useState(projects[0]?.id || '');
  const [punchLogs, setPunchLogs] = useState<{id: string, workerId: string, time: string, date: string, status: string, site: string}[]>([]);

  // Worker Form State
  const [workerName, setWorkerName] = useState('');
  const [workerRole, setWorkerRole] = useState('Unskilled');
  const [workerWage, setWorkerWage] = useState('');

  const submitWorker = (e: React.FormEvent) => {
     e.preventDefault();
     if (!workerName || !workerWage) return;
     addWorker({
       name: workerName,
       role: workerRole as any,
       dailyWage: Number(workerWage),
       advanceBalance: 0
     });
     alert(`Worker ${workerName} successfully onboarded to the system.`);
     setWorkerName('');
     setWorkerWage('');
     setActiveTab('attendance');
  };

  const generateExcelCSV = () => {
    const headers = ['Worker ID,Full Name,Role,Daily Wage (INR),Advance Balance'];
    const rows = workers.map(w => `${w.id},${w.name},${w.role},${w.dailyWage},${w.advanceBalance}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Chavda_Muster_Roll_${selectedSite}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePunch = (workerId: string) => {
    punchAttendance(workerId, selectedSite);
    
    setPunchLogs(prev => [
      { id: Date.now().toString(), workerId, time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString(), status: 'Punched In', site: selectedSite },
      ...prev
    ]);
    
    // Simple mock animation/feedback (kept from original, as instruction's replacement was malformed)
    const el = document.getElementById(`btn-${workerId}`);
    if (el) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Confirmed';
      el.className = 'btn btn-secondary';
      (el as HTMLButtonElement).disabled = true;
    }
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Labour & Attendance</h1>
          <p className="page-description">GPS-based attendance punching, muster roll management, and worker advances.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'attendance' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'attendance' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'attendance' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('attendance')}> GPS Punch-In </button>
        <button className={`btn ${activeTab === 'payroll' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'payroll' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'payroll' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('payroll')}> Muster Roll & Wages </button>
        <button className={`btn ${activeTab === 'onboard' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'onboard' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'onboard' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('onboard')}> Onboard Worker </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
          <div className="card">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Fingerprint size={24} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Daily Site Check-In</h3>
             </div>
             <div className="input-group">
                <label className="input-label">Select Site Selection (Mock GPS)</label>
                <select className="input-field" value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
                   {projects.map(p => (
                     <option key={p.id} value={p.id}>{p.name} (Geo-fenced)</option>
                   ))}
                </select>
             </div>
             
             <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', backgroundColor: 'var(--bg-base)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-success)' }}>
                  <MapPin size={20} /> <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>GPS Location Verified</span>
                </div>
                <div style={{ width: '100%', height: '150px', backgroundColor: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    {selectedSite === 'p3' ? (
                        <iframe src="https://www.google.com/maps?q=19.950782,73.489393&output=embed" width="100%" height="150" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    ) : selectedSite === 'p1' ? (
                        <iframe src="https://www.google.com/maps?q=20.017817,73.760508&output=embed" width="100%" height="150" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    ) : selectedSite === 'p2' ? (
                        <iframe src="https://www.google.com/maps?q=Ragrang+CHS+project,+Nashik&output=embed" width="100%" height="150" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    ) : (
                        "Map Image Rendered Here"
                    )}
                </div>
             </div>

             <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Available Workforce</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               {workers.map(worker => (
                 <div key={worker.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <div>
                     <div style={{ fontWeight: 500 }}>{worker.name}</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{worker.role}</div>
                   </div>
                   <button id={`btn-${worker.id}`} className="btn btn-primary" onClick={() => handlePunch(worker.id)}>Punch In</button>
                 </div>
               ))}
             </div>
          </div>

          <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CheckCircle size={24} color="var(--accent-success)" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Real-Time Log Stream</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                In this ERP, punching in a worker immediately deducts their total daily wage from the <strong>Project Budget</strong> and updates the live P&amp;L statement <strong>General Ledger</strong> cross-module!
                <br /><br />
                The site supervisors no longer require manual verification or end-of-day Excel entries. All analytics directly sync to the Dashboard as soon as the `punchAttendance` state triggers.
              </p>
              {/* Display punch logs */}
              <div style={{ marginTop: '1.5rem', maxHeight: '300px', overflowY: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                {punchLogs.length === 0 ? (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No recent punches.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {punchLogs.map((log) => (
                      <li key={log.id} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>{log.time}</span> - Worker <span style={{ fontWeight: 600 }}>{workers.find(w => w.id === log.workerId)?.name || log.workerId}</span> punched in at <span style={{ fontWeight: 600 }}>{projects.find(p => p.id === log.site)?.name || log.site}</span>.
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </div>
        </div>
      )}

      {activeTab === 'onboard' && (
        <div className="grid grid-cols-1">
          <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Fingerprint size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Onboard New Labourer</h3>
            </div>
            <form onSubmit={submitWorker} className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
               <div className="input-group">
                 <label className="input-label">Full Name as per Aadhaar</label>
                 <input type="text" className="input-field" placeholder="e.g. Ramesh Kumar" value={workerName} onChange={e => setWorkerName(e.target.value)} required />
               </div>
               
               <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                 <div className="input-group">
                   <label className="input-label">Skill Role</label>
                   <select className="input-field" value={workerRole} onChange={e => setWorkerRole(e.target.value)} required>
                     <option value="Unskilled">Unskilled (Helper)</option>
                     <option value="Skilled">Skilled (Mason/Carpenter)</option>
                     <option value="Supervisor">Supervisor / Mukadam</option>
                   </select>
                 </div>
                 <div className="input-group">
                   <label className="input-label">Agreed Daily Wage (₹)</label>
                   <input type="number" className="input-field" placeholder="600" value={workerWage} onChange={e => setWorkerWage(e.target.value)} required />
                 </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                 <button type="submit" className="btn btn-primary">Enroll to Muster Roll</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="grid grid-cols-1">
          <div className="card">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Active Muster Roll</h3>
               <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={generateExcelCSV}>Export to Excel (CSV)</button>
                <button className="btn btn-primary"><HandCoins size={16} /> Process Wages</button>
               </div>
             </div>
             
             <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Daily Wage (₹)</th>
                    <th>Advances Due (₹)</th>
                    <th>Payroll Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map(w => (
                    <tr key={w.id}>
                      <td style={{ fontWeight: 600 }}>{w.id}</td>
                      <td>{w.name}</td>
                      <td>{w.role}</td>
                      <td>{w.dailyWage}</td>
                      <td><span className={w.advanceBalance > 0 ? "status-badge warning" : "status-badge success"} style={{ display: 'inline-flex', padding: '0.25rem 0.5rem' }}>₹{w.advanceBalance}</span></td>
                      <td>
                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>View Ledger</button>
                      </td>
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
