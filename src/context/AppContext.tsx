import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AppState, PurchaseOrder, GRN, Transaction, Project, Worker, Subcontractor, WorkOrder, RABill } from '../types';

interface AppContextType extends AppState {
  addPO: (po: Omit<PurchaseOrder, 'id'>) => void;
  addGRN: (grn: Omit<GRN, 'id'>) => void;
  punchAttendance: (workerId: string, projectId: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  addProject: (proj: Omit<Project, 'id' | 'progress' | 'currentStage'>) => void;
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  addSubcontractor: (vendor: Omit<Subcontractor, 'id'>) => void;
  addWorkOrder: (wo: Omit<WorkOrder, 'id'>) => void;
  addRABill: (bill: Omit<RABill, 'id'>) => void;
}

// Generate mathematically precise large-scale historical data
const generateHistoricalData = () => {
   const data: AppState = {
     projects: [
       { id: 'p1', name: 'Susmita Apartment', reraId: 'Not Applicable', budget: 40000000, spent: 0, status: 'Active', startDate: '2024-07-01', endDate: '2025-12-30', progress: 80, currentStage: 'Finishing & Handover' },
       { id: 'p2', name: 'Ragrang Society', reraId: 'P521000Ragrang', budget: 40000000, spent: 0, status: 'Active', startDate: '2025-01-10', endDate: '2026-12-30', progress: 90, currentStage: 'MEP & Interiors' },
       { id: 'p3', name: 'Dugara Greentown Trimbak - Land Layout (12 Acres)', reraId: 'Not Applicable', budget: 20000000, spent: 0, status: 'Active', startDate: '2026-06-01', endDate: '2028-12-31', progress: 70, currentStage: 'Land Leveling & Demarcation' }
     ],
     materials: [
       { id: 'm1', name: 'Cement (OPC 53 Grade)', unit: 'Bags', stock: 1450, minStockAlert: 200 },
       { id: 'm2', name: 'TMT Steel (Fe 500D)', unit: 'MT', stock: 22.5, minStockAlert: 5 },
       { id: 'm3', name: 'Crushed Sand', unit: 'Cu.Ft', stock: 1800, minStockAlert: 500 },
       { id: 'm4', name: 'Fly Ash Bricks', unit: 'Nos', stock: 12000, minStockAlert: 5000 },
       { id: 'm5', name: 'Vitrified Tiles', unit: 'Sq.Ft', stock: 4500, minStockAlert: 1000 }
     ],
     subcontractors: [
       { id: 's1', name: 'Shree Enterprises', trade: 'Civil Works', balance: 145000 },
       { id: 's2', name: 'Balaji Concreting', trade: 'RMC & Concreting', balance: 0 },
       { id: 's3', name: 'Apex Electricals', trade: 'MEP Services', balance: 56000 }
     ],
     workers: [
        'Ramesh Kumar', 'Suresh Jadhav', 'Amit Patel', 'Santosh Mane', 'Prakash Desai',
        'Vijay Kadam', 'Rajendra Patil', 'Arjun Shinde', 'Mahesh Chavan', 'Sunil Gaikwad',
        'Deepak Varma', 'Nitin Pawar', 'Sandeep Bhosale', 'Anil Kamble', 'Manish Salunkhe',
        'Ravi Munde', 'Kiran Joshi', 'Ganesh Kulkarni', 'Sanjay Raut', 'Pramod More'
     ].map((name, i) => ({
       id: `w${i+1}`, 
       name: name, 
       role: i % 5 === 0 ? 'Supervisor' : (i % 2 === 0 ? 'Skilled' : 'Unskilled'),
       dailyWage: i % 5 === 0 ? 1200 : (i % 2 === 0 ? 800 : 500),
       advanceBalance: i % 3 === 0 ? 1500 : 0
     })),
     purchaseOrders: [],
     grns: [],
     transactions: [],
     workOrders: [
        { id: 'WO-2026-081', subcontractorId: 's1', projectId: 'p1', scope: 'Tower B Plinth', value: 450000, status: 'Active', date: '2026-02-15' },
        { id: 'WO-2026-064', subcontractorId: 's2', projectId: 'p2', scope: 'Phase 2 Roads', value: 820500, status: 'Completed', date: '2025-11-20' }
     ],
     raBills: [
        { id: 'RA-104', workOrderId: 'WO-2026-081', projectId: 'p1', subcontractorId: 's1', amount: 1245000, status: 'Pending', date: '2026-03-20' },
        { id: 'RA-103', workOrderId: 'WO-2026-064', projectId: 'p2', subcontractorId: 's2', amount: 820500, status: 'Passed', date: '2026-01-10' }
     ]
   };

   // Exactly target 70M total expense. p1 -> 30M (75% of 40M). p2 -> 28M (70% of 40M). p3 -> 12M (60% of 20M).
   const targetP1 = 30000000;
   const targetP2 = 28000000;
   const targetP3 = 12000000;
   const totalIncomeTarget = 200000000;
   const months = 20;

   const startDate = new Date('2024-07-15');
   
   for (let m = 0; m < months; m++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + m);
      const dateStr = monthDate.toISOString().split('T')[0];

      // Income (Spread evenly)
      data.transactions.push({
         id: `tx-inc-${m}-1`,
         projectId: m % 2 === 0 ? 'p1' : 'p2',
         description: m % 3 === 0 ? `Unit Booking Advance (Client)` : `Milestone Completion Payment`,
         amount: totalIncomeTarget / months,
         type: 'Income',
         date: dateStr
      });
      
      // Expense (Spread evenly for each project across the 20 months)
      const p1MonthExp = targetP1 / months;
      const p2MonthExp = targetP2 / months;
      const p3MonthExp = targetP3 / months;

      [
        { p: 'p1', amt: p1MonthExp },
        { p: 'p2', amt: p2MonthExp },
        { p: 'p3', amt: p3MonthExp }
      ].forEach(item => {
        data.transactions.push({
           id: `tx-exp-mat-${m}-${item.p}`,
           projectId: item.p,
           description: `Material Procurement - Month ${m+1}`,
           amount: item.amt * 0.4,
           type: 'Expense',
           date: dateStr
        });
        data.transactions.push({
           id: `tx-exp-lab-${m}-${item.p}`,
           projectId: item.p,
           description: `Labor Payroll & Advances - Month ${m+1}`,
           amount: item.amt * 0.3,
           type: 'Expense',
           date: dateStr
        });
        data.transactions.push({
           id: `tx-exp-sub-${m}-${item.p}`,
           projectId: item.p,
           description: `Subcontractor RA Bill Clearance - Month ${m+1}`,
           amount: item.amt * 0.3,
           type: 'Expense',
           date: dateStr
        });
      });

      // Also generate some mock POs and GRNs for realism
      if (m % 2 === 0) {
        data.purchaseOrders.push({
           id: `PO-202X-${m}`,
           projectId: 'p1',
           materialId: 'm1',
           supplierName: 'UltraTech Corp',
           quantity: 500,
           rate: 380,
           totalAmount: 190000,
           status: m > 16 ? 'Approved' : 'Closed',
           date: dateStr
        });
        data.grns.push({
          id: `GRN-202X-${m}`,
          poId: `PO-202X-${m}`,
          receivedQty: 500,
          challanNo: `CHL-${1000 + m}`,
          date: dateStr
        });
      }
   }

   // Compute Final Mathematically Exact Spent for Dashboard Math Tracking
   data.projects = data.projects.map(p => {
       const calcSpent = data.transactions.filter(t => t.projectId === p.id && t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
       return { ...p, spent: calcSpent };
   });

   return data;
};

const initialState: AppState = generateHistoricalData();

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const addPO = (po: Omit<PurchaseOrder, 'id'>) => {
    const newPO = { ...po, id: `po${Date.now()}` };
    setState(prev => ({ ...prev, purchaseOrders: [...prev.purchaseOrders, newPO] }));
  };

  const addGRN = (grn: Omit<GRN, 'id'>) => {
    const newGRN = { ...grn, id: `grn${Date.now()}` };
    const po = state.purchaseOrders.find(p => p.id === grn.poId);
    
    setState(prev => {
      // Update inventory stock based on GRN
      const updatedMaterials = prev.materials.map(m => {
        if (po && m.id === po.materialId) {
          return { ...m, stock: m.stock + grn.receivedQty };
        }
        return m;
      });

      // Update project spent if we want to immediately recognize GRN as expense 
      const updatedProjects = prev.projects.map(p => {
        if (po && p.id === po.projectId) {
           return { ...p, spent: p.spent + ((po.rate || 0) * grn.receivedQty) };
        }
        return p;
      });

      const newTx: Transaction = {
         id: `tx${Date.now()}`,
         projectId: po?.projectId || '',
         description: `GRN recorded for PO ${po?.id}`,
         amount: (po?.rate || 0) * grn.receivedQty,
         type: 'Expense',
         date: grn.date
      };

      return {
        ...prev,
        grns: [...prev.grns, newGRN],
        materials: updatedMaterials,
        projects: updatedProjects,
        transactions: [...prev.transactions, newTx]
      };
    });
  };

  const punchAttendance = (workerId: string, projectId: string) => {
    setState(prev => {
      const worker = prev.workers.find(w => w.id === workerId);
      if (!worker) return prev;

      const updatedProjects = prev.projects.map(p => {
        if (p.id === projectId) return { ...p, spent: p.spent + worker.dailyWage };
        return p;
      });

      const newTx: Transaction = {
         id: `TX-WAGE-${Date.now().toString().slice(-6)}`,
         projectId,
         description: `Daily Wage for ${worker.name}`,
         amount: worker.dailyWage,
         type: 'Expense',
         date: new Date().toISOString().split('T')[0]
      };

      return {
        ...prev,
        projects: updatedProjects,
        transactions: [...prev.transactions, newTx]
      };
    });
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx = { ...tx, id: `tx${Date.now()}` };
    setState(prev => {
      const updatedProjects = prev.projects.map(p => {
        if(p.id === tx.projectId) {
           return { ...p, spent: tx.type === 'Expense' ? p.spent + tx.amount : p.spent }
        }
        return p;
      });
      return { ...prev, transactions: [...prev.transactions, newTx], projects: updatedProjects };
    });
  };

  const addProject = (proj: Omit<Project, 'id' | 'progress' | 'currentStage'>) => {
     const newProj = { ...proj, id: `p${Date.now()}`, progress: 0, currentStage: 'Initial Setup' };
     setState(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const addWorker = (worker: Omit<Worker, 'id'>) => {
    setState(prev => ({ ...prev, workers: [...prev.workers, { ...worker, id: `w${Date.now()}` }] }));
  };

  const addSubcontractor = (vendor: Omit<Subcontractor, 'id'>) => {
    setState(prev => ({ ...prev, subcontractors: [...prev.subcontractors, { ...vendor, id: `s${Date.now()}` }] }));
  };

  const addWorkOrder = (wo: Omit<WorkOrder, 'id'>) => {
    setState(prev => ({ ...prev, workOrders: [ { ...wo, id: `WO-${Date.now().toString().slice(-6)}` }, ...prev.workOrders] }));
  };

  const addRABill = (bill: Omit<RABill, 'id'>) => {
    setState(prev => ({ ...prev, raBills: [ { ...bill, id: `RA-${Date.now().toString().slice(-4)}` }, ...prev.raBills] }));
  };

  return (
    <AppContext.Provider value={{ ...state, addPO, addGRN, punchAttendance, addTransaction, addProject, addWorker, addSubcontractor, addWorkOrder, addRABill }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
