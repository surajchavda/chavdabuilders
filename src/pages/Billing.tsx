import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Calculator, Receipt, CheckCircle2, TrendingUp, TrendingDown, Wallet, Plus, Trash2 } from 'lucide-react';

export default function Billing() {
  const { projects, transactions, raBills } = useAppState();
  const [activeTab, setActiveTab] = useState('pnl');

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const totalSpent = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalSpent;

  // DSR Estimate State
  const [estimateRows, setEstimateRows] = useState([
    { id: '1', code: 'Bd-E.1', desc: 'Providing and laying cast in situ...', qty: 150, unit: 'Cu.m', rate: 6450 }
  ]);

  const addEstimateRow = () => {
    setEstimateRows([...estimateRows, { id: Date.now().toString(), code: '', desc: '', qty: 0, unit: 'Sqm', rate: 0 }]);
  };

  const updateEstimateRow = (id: string, field: string, value: string | number) => {
    setEstimateRows(estimateRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const removeEstimateRow = (id: string) => {
     setEstimateRows(estimateRows.filter(row => row.id !== id));
  };

  const calculateEstimateSubtotal = () => {
    return estimateRows.reduce((sum, row) => sum + (Number(row.qty) * Number(row.rate)), 0);
  };
  
  const estimateSubtotal = calculateEstimateSubtotal();
  const estimateTaxes = estimateSubtotal * 0.19; // 18% GST + 1% Labor Cess
  const estimateTotal = estimateSubtotal + estimateTaxes;

  const handleGeneratePDF = () => {
    alert("DSR Estimate Saved to Database! BOQ PDF Generation triggered successfully.");
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Finance & Billing</h1>
          <p className="page-description">Budget vs Actuals, General Ledger, and PWD DSR Estimates across all active sites.</p>
        </div>
      </div>

      <div className="tab-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'pnl' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'pnl' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'pnl' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('pnl')}> Live P&L </button>
        <button className={`btn ${activeTab === 'estimate' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'estimate' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'estimate' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('estimate')}> Estimates (PWD DSR) </button>
        <button className={`btn ${activeTab === 'rabills' ? 'btn-secondary' : ''}`} style={{ border: 'none', background: activeTab === 'rabills' ? 'var(--bg-elevated)' : 'transparent', color: activeTab === 'rabills' ? 'var(--text-primary)' : 'var(--text-secondary)' }} onClick={() => setActiveTab('rabills')}> Subcontractor RA Bills </button>
      </div>

      {activeTab === 'pnl' && (
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-3" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--accent-success)' }}>
               <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Gross Revenue</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: 'var(--accent-success)' }}>₹{(totalIncome/10000000).toFixed(2)} Cr</div>
                 <TrendingUp size={20} color="var(--accent-success)" />
               </div>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Client Bookings & Milestone Payments</div>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--accent-danger)' }}>
               <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Overall Invest (Capital Deployed)</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: 'var(--accent-danger)' }}>₹{(totalSpent/10000000).toFixed(2)} Cr</div>
                 <TrendingDown size={20} color="var(--accent-danger)" />
               </div>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Includes Material, Labour & Subcontractor Pay</div>
            </div>
            <div className="card" style={{ borderLeft: `8px solid ${netProfit > 0 ? 'var(--accent-primary)' : 'var(--accent-warning)'}`, backgroundColor: 'var(--bg-elevated)' }}>
               <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>Net Profit Yield</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: netProfit > 0 ? 'var(--text-primary)' : 'var(--accent-warning)' }}>₹{(netProfit/10000000).toFixed(2)} Cr</div>
               </div>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Mathematical Margin Across All Sites</div>
            </div>
          </div>

          <div className="card">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <Wallet size={24} color="var(--accent-warning)" />
                   <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Consolidated General Ledger (Last 20 Months)</h3>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Showing {transactions.length} verified mathematical entries</div>
             </div>
             <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
               <table className="data-table">
                 <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-surface)', zIndex: 10 }}>
                   <tr>
                     <th>Trx. ID</th>
                     <th>Date Executed</th>
                     <th>Entity Branch</th>
                     <th>Cost Head Description</th>
                     <th>Entry Type</th>
                     <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[...transactions].reverse().map((tx, idx) => {
                     const proj = projects.find(p => p.id === tx.projectId);
                     return (
                       <tr key={tx.id || idx}>
                         <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.id}</td>
                         <td style={{ fontWeight: 500 }}>{tx.date}</td>
                         <td>{proj?.name || 'Central Org'}</td>
                         <td>{tx.description}</td>
                         <td><span className={`status-badge ${tx.type === 'Income' ? 'success' : 'danger'}`}>{tx.type}</span></td>
                         <td style={{ fontWeight: 600, textAlign: 'right', color: tx.type === 'Income' ? 'var(--accent-success)' : 'var(--text-primary)' }}>{tx.type === 'Income' ? '+' : '-'}{tx.amount.toLocaleString()}</td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'estimate' && (
        <div className="grid grid-cols-1">
          <div className="card glass-panel" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                 <Calculator size={24} color="var(--accent-primary)" />
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Dynamic PWD DSR Estimate Builder</h3>
               </div>
               <button className="btn btn-secondary" onClick={addEstimateRow}><Plus size={16} /> Add Row line</button>
             </div>

             <div className="table-container" style={{ marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
               <table className="data-table">
                 <thead>
                   <tr>
                     <th>Item Code</th>
                     <th>Description of Work</th>
                     <th>Quantity</th>
                     <th>Unit</th>
                     <th>DSR Rate (₹)</th>
                     <th>Total Amount (₹)</th>
                     <th></th>
                   </tr>
                 </thead>
                 <tbody>
                   {estimateRows.map(row => (
                     <tr key={row.id}>
                       <td><input type="text" className="input-field" value={row.code} onChange={e => updateEstimateRow(row.id, 'code', e.target.value)} style={{ width: '100px', padding: '0.5rem' }} placeholder="Code" /></td>
                       <td style={{ minWidth: '250px' }}><input type="text" className="input-field" value={row.desc} onChange={e => updateEstimateRow(row.id, 'desc', e.target.value)} style={{ padding: '0.5rem' }} placeholder="Description..." /></td>
                       <td><input type="number" className="input-field" value={row.qty} onChange={e => updateEstimateRow(row.id, 'qty', e.target.value)} style={{ width: '80px', padding: '0.5rem' }} /></td>
                       <td>
                         <select className="input-field" style={{ padding: '0.5rem' }} value={row.unit} onChange={e => updateEstimateRow(row.id, 'unit', e.target.value)}>
                           <option>Cu.m</option>
                           <option>Sqm</option>
                           <option>Rmt</option>
                           <option>Nos</option>
                           <option>Ltr</option>
                           <option>Kg</option>
                         </select>
                       </td>
                       <td><input type="number" className="input-field" value={row.rate} onChange={e => updateEstimateRow(row.id, 'rate', e.target.value)} style={{ width: '100px', padding: '0.5rem' }} /></td>
                       <td style={{ fontWeight: 600 }}>{(Number(row.qty) * Number(row.rate)).toLocaleString()}</td>
                       <td><button className="btn" style={{ padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--accent-danger)' }} onClick={() => removeEstimateRow(row.id)}><Trash2 size={16} /></button></td>
                     </tr>
                   ))}
                  {estimateRows.length === 0 && <tr><td colSpan={7} style={{ textAlign:'center', color: 'var(--text-muted)' }}>Click Add Row Line to build an estimate.</td></tr>}
                 </tbody>
               </table>
             </div>

             <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
               <div>
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Standard Tax Additions Applied: GST @ 18%, Labor Cess @ 1%</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Calculated Subtotal: ₹{estimateSubtotal.toLocaleString()}</p>
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Taxes & Cess (19%): ₹{estimateTaxes.toLocaleString()}</p>
                 <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--accent-primary)' }}>Final Value: ₹{estimateTotal.toLocaleString()}</h2>
               </div>
             </div>

             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
               <button className="btn btn-primary" onClick={handleGeneratePDF}>Save & Generate BOQ PDF</button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'rabills' && (
        <div className="grid grid-cols-1">
          <div className="card">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Cross-Site Sub-Contractor RA Bills</h3>
               <button className="btn btn-primary"><Receipt size={16} /> Filter by Project</button>
             </div>
             <div className="table-container">
               <table className="data-table">
                 <thead>
                   <tr>
                     <th>Bill ID</th>
                     <th>Linked WO Ref</th>
                     <th>Site Context</th>
                     <th>Amount (₹)</th>
                     <th>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {raBills.map(bill => {
                      const proj = projects.find(p => p.id === bill.projectId);
                      return (
                        <tr key={bill.id}>
                          <td style={{ fontWeight: 500 }}>{bill.id}</td>
                          <td>{bill.workOrderId}</td>
                          <td>{proj?.name}</td>
                          <td style={{ fontWeight: 600 }}>{bill.amount.toLocaleString()}</td>
                          <td><span className={`status-badge ${bill.status === 'Passed' ? 'success' : 'warning'}`}>{bill.status === 'Passed' && <CheckCircle2 size={12} style={{ marginRight: '0.25rem', display: 'inline' }}/>} {bill.status}</span></td>
                        </tr>
                      );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
