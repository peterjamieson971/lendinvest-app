import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { DemoInfo } from './pages/DemoInfo';
import { Step1Eligibility as OldStep1 } from './pages/Step1Eligibility';
import { Step1Eligibility } from './pages/apply/Step1Eligibility';
import { Step2PropertyDetails } from './pages/apply/Step2PropertyDetails';
import { Step3Documents } from './pages/apply/Step3Documents';
import { Step4Banking } from './pages/apply/Step4Banking';
import { Step5Decision } from './pages/apply/Step5Decision';
import { Dashboard } from './pages/Dashboard';
import { ComponentTest } from './pages/ComponentTest';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/demo-info" element={<DemoInfo />} />

          {/* Protected Application Routes */}
          <Route path="/apply/step1" element={<ProtectedRoute><Step1Eligibility /></ProtectedRoute>} />
          <Route path="/apply/step2" element={<ProtectedRoute><Step2PropertyDetails /></ProtectedRoute>} />
          <Route path="/apply/step3" element={<ProtectedRoute><Step3Documents /></ProtectedRoute>} />
          <Route path="/apply/step4" element={<ProtectedRoute><Step4Banking /></ProtectedRoute>} />
          <Route path="/apply/step5" element={<ProtectedRoute><Step5Decision /></ProtectedRoute>} />

          {/* Legacy routes */}
          <Route path="/apply/1" element={<ProtectedRoute><OldStep1 /></ProtectedRoute>} />
          <Route path="/apply/2" element={<ProtectedRoute><Step2PropertyDetails /></ProtectedRoute>} />
          <Route path="/apply/3" element={<ProtectedRoute><Step3Documents /></ProtectedRoute>} />
          <Route path="/apply/4" element={<ProtectedRoute><Step4Banking /></ProtectedRoute>} />
          <Route path="/apply/5" element={<ProtectedRoute><Step5Decision /></ProtectedRoute>} />

          {/* Protected Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Test route */}
          <Route path="/test" element={<ComponentTest />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
