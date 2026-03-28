import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { PackageOpen, FileSignature, CheckCircle2, Box } from 'lucide-react';

export default function Materials() {
  const { materials, purchaseOrders, grns, projects, addGRN, addPO } = useAppState();
  const [activeTab, setActiveTab] = useState('inventory');
  
  // GRN State
  const [selectedPO, setSelectedPO] = useState('');
  const [grnQty, setGrnQty] = useState('');
  const [grnChallan, setGrnChallan] = useState('');

  // PO State
  const [poProject, setPoProject] = useState('');
  const [poMaterial, setPoMaterial] = useState('');
  const [poSupplier, setPoSupplier] = useState('');
  const [poQty, setPoQty] = useState('');
  const [poRate, setPoRate] = useState('');

  const handleCreateGRN = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPO || !grnQty) return;
    addGRN({
      poId: selectedPO,
      receivedQty: Number(grnQty),
      challanNo: grnChallan || 'CHL-' + Date.now().toString().slice(-4),
      date: new Date().toISOString().split('T')[0]
    });
    setSelectedPO('');
    setGrnQty('');
    setGrnChallan('');
    alert("Goods Receipt Note successfully logged and Inventory Updated! The system has accounted for this expense mathematically against the total Project budget.");
    setActiveTab('grn');
  };

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poProject || !poMaterial || !poSupplier || !poQty || !poRate) return;
    
    addPO({
      projectId: poProject,
      materialId: poMaterial,
      supplierName: poSupplier,
      quantity: Number(poQty),
      rate: Number(poRate),
      totalAmount: Number(poQty) * Number(poRate),
      status: 'Approved', // Auto-approving for demo interactivity
      date: new Date().toISOString().split('T')[0]
    });
    
    setPoProject('');
    setPoMaterial('');
    setPoSupplier('');
    setPoQty('');
    setPoRate('');
    alert("Purchase Order Approved and Dispatched! It is now available to be GRN'd by the site engineer.");
    setActiveTab('po');
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Materials & Inventory</h1>
          <p className="page-description">Automate RFQ, issue Purchase Orders, process GRN, and track supplier inventory.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('newPO')}><FileSignature size={16} /> Draft RFQ / PO</button>
      </div>

      <div className="tab-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'inventory' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'inventory' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'inventory' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('inventory')}> Site Inventory </button>
        <button className={`btn ${activeTab === 'po' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'po' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'po' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('po')}> Purchase Orders (PO) </button>
        <button className={`btn ${activeTab === 'grn' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'grn' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'grn' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('grn')}> Goods Receipt (GRN) </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1">
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}><Box size={20} style={{ display: 'inline', marginRight: '0.5rem' }}/> Live Material Stock</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Material Type</th>
                    <th>Current Stock</th>
                    <th>Unit</th>
                    <th>Min Alert Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(mat => (
                    <tr key={mat.id}>
                      <td>{mat.id}</td>
                      <td style={{ fontWeight: 500 }}>{mat.name}</td>
                      <td>{mat.stock}</td>
                      <td>{mat.unit}</td>
                      <td>{mat.minStockAlert}</td>
                      <td>
                        {mat.stock <= mat.minStockAlert ? 
                          <span className="status-badge danger" style={{ color: 'var(--accent-danger)', backgroundColor: 'rgba(239,68,68,0.1)' }}>Low Stock</span> : 
                          <span className="status-badge success">Optimal</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'newPO' && (
        <div className="grid grid-cols-1">
          <form className="card glass-panel" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }} onSubmit={handleCreatePO}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <FileSignature size={24} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Draft Purchase Order</h3>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
               <div className="input-group">
                 <label className="input-label">Project / Site Name</label>
                 <select className="input-field" value={poProject} onChange={(e) => setPoProject(e.target.value)} required>
                   <option value="">Select Project...</option>
                   {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                 </select>
               </div>
               <div className="input-group">
                 <label className="input-label">Select Material</label>
                 <select className="input-field" value={poMaterial} onChange={(e) => setPoMaterial(e.target.value)} required>
                   <option value="">Select Material Item...</option>
                   {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                 </select>
               </div>
               
               <div className="input-group" style={{ gridColumn: 'span 2' }}>
                 <label className="input-label">Supplier / Vendor Name</label>
                 <input type="text" className="input-field" placeholder="e.g. UltraTech Corp" value={poSupplier} onChange={e => setPoSupplier(e.target.value)} required />
               </div>

               <div className="input-group">
                 <label className="input-label">Order Quantity</label>
                 <input type="number" className="input-field" placeholder="0" value={poQty} onChange={e => setPoQty(e.target.value)} required />
               </div>
               <div className="input-group">
                 <label className="input-label">Negotiated Rate (₹)</label>
                 <input type="number" className="input-field" placeholder="0.00" value={poRate} onChange={e => setPoRate(e.target.value)} required />
               </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total PO Value: </strong>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{(Number(poQty) * Number(poRate)).toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
               <button type="submit" className="btn btn-primary">Authorize PO</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'po' && (
        <div className="grid grid-cols-1">
          <div className="card">
             <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Active Purchase Orders</h3>
             <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>PO ID</th>
                    <th>Supplier</th>
                    <th>Date</th>
                    <th>Material</th>
                    <th>Total Qty</th>
                    <th>Value (₹)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...purchaseOrders].reverse().map(po => {
                    const materialName = materials.find(m => m.id === po.materialId)?.name || 'Unknown';
                    return (
                      <tr key={po.id}>
                        <td style={{ fontWeight: 600 }}>{po.id}</td>
                        <td>{po.supplierName}</td>
                        <td>{po.date}</td>
                        <td>{materialName}</td>
                        <td>{po.quantity}</td>
                        <td>{po.totalAmount.toLocaleString()}</td>
                        <td><span className={`status-badge ${po.status === 'Approved' ? 'success' : 'warning'}`}>{po.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'grn' && (
         <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
            <form className="card glass-panel" onSubmit={handleCreateGRN}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <PackageOpen size={24} color="var(--accent-warning)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Inward Material (Create GRN)</h3>
               </div>
               
               <div className="input-group">
                 <label className="input-label">Select Source PO</label>
                 <select className="input-field" value={selectedPO} onChange={(e) => setSelectedPO(e.target.value)} required>
                    <option value="">Select Approved PO...</option>
                    {purchaseOrders.filter(po => po.status === 'Approved').map(po => (
                      <option key={po.id} value={po.id}>{po.id} - {po.supplierName} (Qty: {po.quantity})</option>
                    ))}
                 </select>
               </div>

               <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                 <div className="input-group">
                   <label className="input-label">Received Quantity</label>
                   <input type="number" className="input-field" value={grnQty} onChange={(e) => setGrnQty(e.target.value)} placeholder="0" required />
                 </div>
                 <div className="input-group">
                   <label className="input-label">Challan / Vehicle No</label>
                   <input type="text" className="input-field" value={grnChallan} onChange={(e) => setGrnChallan(e.target.value)} placeholder="CHL-1024" />
                 </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                 <button type="submit" className="btn btn-primary">Process GRN</button>
               </div>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                 * Accepting a GRN immediately pushes this material entry into the General Ledger as a Capital Expense & increases live Site Inventory exactly mathematically.
               </p>
            </form>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={24} color="var(--accent-success)" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent GRN History</h3>
              </div>
              {grns.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No GRNs processed yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                  {[...grns].reverse().map(grn => (
                    <div key={grn.id} style={{ display: 'flex', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                         <div style={{ fontWeight: 600 }}>{grn.id}</div>
                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>PO Link: {grn.poId} • Challan: {grn.challanNo}</div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                         <div style={{ fontWeight: 600, color: 'var(--accent-success)' }}>+{grn.receivedQty} Qty</div>
                         <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{grn.date}</div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
         </div>
      )}

    </div>
  );
}
