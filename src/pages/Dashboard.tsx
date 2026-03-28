import { AlertTriangle, TrendingDown, Box, Activity, IndianRupee } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export default function Dashboard() {
  const { projects, materials, purchaseOrders, transactions } = useAppState();

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const totalSpent = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalSpent;
  
  const lowStockMaterials = materials.filter(m => m.stock <= m.minStockAlert);
  const activePOs = purchaseOrders.filter(po => po.status === 'Approved').length;

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">AI Dashboard</h1>
          <p className="page-description">Real-time intelligence and cross-module analytics for absolute site control.</p>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
         <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(59,130,246,0.1)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
               <Activity size={24} />
            </div>
            <span className="status-badge info">Sites</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem' }}>{projects.length}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Active Projects</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-md)' }}>
              <TrendingDown size={24} />
            </div>
            <span className="status-badge danger">Expense</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem' }}>₹{(totalSpent/10000000).toFixed(2)} Cr</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Capital Deployed</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-elevated)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(59,130,246,0.1)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
              <IndianRupee size={24} />
            </div>
            <span className="status-badge success">Margin</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>₹{(netProfit/10000000).toFixed(2)} Cr</div>
          <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Net Profit Recorded</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--accent-success)', borderRadius: 'var(--radius-md)' }}>
               <Box size={24} />
            </div>
            <span className="status-badge success">POs</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem' }}>{activePOs}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Active Material Orders</div>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
        {/* AI Actionable Insights */}
        <div className="card glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>AI Intelligence</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {lowStockMaterials.length > 0 && lowStockMaterials.map(m => (
                <div key={m.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
                   <AlertTriangle size={20} color="var(--accent-danger)" style={{ flexShrink: 0 }} />
                   <div>
                     <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Critical Material Shortage</div>
                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{m.name} is currently at {m.stock} {m.unit} (Below threshold of {m.minStockAlert}). Issue RFQ immediately to prevent site delays.</div>
                   </div>
                </div>
             ))}

             <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: 'rgba(16,185,129,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.2)' }}>
                 <Activity size={20} color="var(--accent-success)" style={{ flexShrink: 0 }} />
                 <div>
                   <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Optimal Portfolio Health</div>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>All Chavda Builders sites (Susmita, Ragrang, Dugara) are operating efficiently within their Capital Allocations.</div>
                 </div>
             </div>
          </div>
        </div>

        {/* Multi-Site Project Health */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Multi-Site Health</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View Map</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Budget Exhaustion</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                   <tr key={p.id}>
                     <td style={{ fontWeight: 500 }}>{p.name}</td>
                     <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                           <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.min((p.spent/p.budget)*100, 100)}%`, height: '100%', backgroundColor: (p.spent/p.budget) > 0.8 ? 'var(--accent-danger)' : 'var(--accent-primary)' }}></div>
                           </div>
                           <span style={{ fontSize: '0.75rem', minWidth: '30px' }}>{((p.spent/p.budget)*100).toFixed(0)}%</span>
                        </div>
                     </td>
                     <td><span className={`status-badge ${p.status === 'Active' ? 'success' : 'warning'}`}>{p.status}</span></td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
