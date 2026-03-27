import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Materials from './pages/Materials';
import Labour from './pages/Labour';
import Execution from './pages/Execution';
import Subcontractors from './pages/Subcontractors';
import Billing from './pages/Billing';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="planning" element={<Planning />} />
          <Route path="materials" element={<Materials />} />
          <Route path="labour" element={<Labour />} />
          <Route path="execution" element={<Execution />} />
          <Route path="subcontractors" element={<Subcontractors />} />
          <Route path="finance" element={<Billing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
