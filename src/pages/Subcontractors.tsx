import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Users, FileText, CheckSquare, PlusCircle } from 'lucide-react';

export default function Subcontractors() {
  const { subcontractors, projects, workOrders, addWorkOrder, addSubcontractor } = useAppState();
  const [activeTab, setActiveTab] = useState('directory');

  // Vendor state
  const [vendorName, setVendorName] = useState('');
  const [vendorTrade, setVendorTrade] = useState('');

  // Work Order state
  const [woVendor, setWoVendor] = useState('');
  const [woProject, setWoProject] = useState('');
  const [woScope, setWoScope] = useState('');
  const [woValue, setWoValue] = useState('');

  const submitVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !vendorTrade) return;
    addSubcontractor({ name: vendorName, trade: vendorTrade, balance: 0 });
    alert(`Subcontractor ${vendorName} successfully onboarded!`);
    setVendorName('');
    setVendorTrade('');
    setActiveTab('directory');
  };

  const submitWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!woVendor || !woProject || !woScope || !woValue) return;
    addWorkOrder({
      subcontractorId: woVendor,
      projectId: woProject,
      scope: woScope,
      value: Number(woValue),
      status: 'Active',
      date: new Date().toISOString().split('T')[0]
    });
    alert(`Work Order Issued Successfully to Vendor!`);
    setWoVendor('');
    setWoProject('');
    setWoScope('');
    setWoValue('');
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Subcontractor Management</h1>
          <p className="page-description">Vendor Directory, Work Orders, and RA Bill status tracking.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('newVendor')}><PlusCircle size={16} /> New Vendor</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'directory' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'directory' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'directory' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('directory')}> Vendor Directory </button>
        <button className={`btn ${activeTab === 'workorders' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'workorders' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'workorders' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('workorders')}> Work Orders </button>
      </div>

      {activeTab === 'directory' && (
        <div className="grid grid-cols-1">
          <div className="card">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Users size={24} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Active Subcontractors</h3>
             </div>
             <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor ID</th>
                    <th>Business Name</th>
                    <th>Trade Category</th>
                    <th>Total Outstanding (₹)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subcontractors.map(sub => (
                    <tr key={sub.id}>
                      <td style={{ fontWeight: 600 }}>{sub.id}</td>
                      <td>{sub.name}</td>
                      <td>{sub.trade}</td>
                      <td style={{ color: sub.balance > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{sub.balance.toLocaleString()}</td>
                      <td><span className="status-badge success">Approved Vendor</span></td>
                      <td><button className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>View Ledgers</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'newVendor' && (
        <div className="grid grid-cols-1">
          <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Users size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Onboard New Subcontractor</h3>
            </div>
            <form onSubmit={submitVendor} className="grid grid-cols-1" style={{ gap: '1rem' }}>
               <div className="input-group">
                 <label className="input-label">Business / Vendor Name</label>
                 <input type="text" className="input-field" placeholder="e.g. Apex Concreting" value={vendorName} onChange={(e) => setVendorName(e.target.value)} required />
               </div>
               <div className="input-group">
                 <label className="input-label">Trade Category</label>
                 <select className="input-field" value={vendorTrade} onChange={(e) => setVendorTrade(e.target.value)} required>
                   <option value="">Select Category...</option>
                   <option value="Civil Works">Civil Works</option>
                   <option value="MEP Services">MEP Services</option>
                   <option value="Painting & Finishing">Painting & Finishing</option>
                   <option value="Waterproofing">Waterproofing</option>
                   <option value="Earthworks">Earthworks</option>
                 </select>
               </div>
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                 <button type="submit" className="btn btn-primary">Save to Directory</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'workorders' && (
         <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
            <form className="card glass-panel" onSubmit={submitWorkOrder}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <FileText size={24} color="var(--accent-warning)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Issue Work Order (WO)</h3>
               </div>
               
               <div className="input-group" style={{ marginBottom: '1rem' }}>
                 <label className="input-label">Select Subcontractor</label>
                 <select className="input-field" value={woVendor} onChange={e => setWoVendor(e.target.value)} required>
                    <option value="">Select Vendor...</option>
                    {subcontractors.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name} - {sub.trade}</option>
                    ))}
                 </select>
               </div>

               <div className="input-group" style={{ marginBottom: '1rem' }}>
                 <label className="input-label">Select Project / Site</label>
                 <select className="input-field" value={woProject} onChange={e => setWoProject(e.target.value)} required>
                    <option value="">Select Site...</option>
                    {projects.filter(p => p.status === 'Active').map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                 </select>
               </div>

               <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                 <div className="input-group">
                   <label className="input-label">Scope of Work</label>
                   <input type="text" className="input-field" placeholder="e.g. 5th Floor Slab Casting" value={woScope} onChange={e => setWoScope(e.target.value)} required />
                 </div>
                 <div className="input-group">
                   <label className="input-label">Agreed Value (₹)</label>
                   <input type="number" className="input-field" placeholder="0.00" value={woValue} onChange={e => setWoValue(e.target.value)} required />
                 </div>
               </div>

               <div className="input-group" style={{ marginTop: '1rem' }}>
                  <label className="input-label">Terms & Conditions</label>
                  <textarea className="input-field" rows={3} placeholder="Standard SLA and Retention terms..."></textarea>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                 <button type="submit" className="btn btn-primary">Generate Work Order</button>
               </div>
            </form>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CheckSquare size={24} color="var(--accent-success)" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Latest Work Orders</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                 {workOrders.map(wo => {
                    const contractor = subcontractors.find(s => s.id === wo.subcontractorId);
                    return (
                      <div key={wo.id} style={{ display: 'flex', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{wo.id}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{contractor?.name} • {wo.scope}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 600 }}>₹{wo.value.toLocaleString()}</div>
                          <span className={`status-badge ${wo.status === 'Completed' ? 'success' : 'info'}`} style={{ marginTop: '0.25rem', padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>{wo.status}</span>
                        </div>
                      </div>
                    );
                 })}
                 {workOrders.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No Work Orders issued yet.</p>}
              </div>
            </div>
         </div>
      )}
    </div>
  );
}
