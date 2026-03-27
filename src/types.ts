export interface Project {
  id: string;
  name: string;
  reraId?: string;
  budget: number;
  spent: number;
  status: 'Planning' | 'Active' | 'Completed' | 'Halted';
  startDate: string;
  endDate: string;
  progress: number;
  currentStage: string;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  stock: number;
  minStockAlert: number;
}

export interface Subcontractor {
  id: string;
  name: string;
  trade: string; // e.g., 'Civil', 'Electrical'
  balance: number; // Amount owed
}

export interface Worker {
  id: string;
  name: string;
  role: 'Skilled' | 'Unskilled' | 'Supervisor';
  dailyWage: number;
  advanceBalance: number;
}

export interface PurchaseOrder {
  id: string;
  projectId: string;
  materialId: string;
  supplierName: string;
  quantity: number;
  rate: number;
  totalAmount: number;
  status: 'Draft' | 'Approved' | 'Closed';
  date: string;
}

export interface GRN {
  id: string;
  poId: string;
  receivedQty: number;
  date: string;
  challanNo: string;
}

export interface Transaction {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  type: 'Expense' | 'Income';
  date: string;
}

export interface WorkOrder {
  id: string;
  subcontractorId: string;
  projectId: string;
  scope: string;
  value: number;
  status: 'Active' | 'Completed';
  date: string;
}

export interface RABill {
  id: string;
  workOrderId: string;
  projectId: string;
  subcontractorId: string;
  amount: number;
  status: 'Pending' | 'Passed';
  date: string;
}

export interface AppState {
  projects: Project[];
  materials: Material[];
  subcontractors: Subcontractor[];
  workers: Worker[];
  purchaseOrders: PurchaseOrder[];
  grns: GRN[];
  transactions: Transaction[];
  workOrders: WorkOrder[];
  raBills: RABill[];
}
