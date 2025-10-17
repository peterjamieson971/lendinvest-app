import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Step1Eligibility as OldStep1 } from './pages/Step1Eligibility';
import { Step1Eligibility } from './pages/apply/Step1Eligibility';
import { Step2PropertyDetails } from './pages/apply/Step2PropertyDetails';
import { Step3Documents } from './pages/apply/Step3Documents';
import { Step4Banking } from './pages/apply/Step4Banking';
import { Step5Decision as OldStep5 } from './pages/Step5Decision';
import { Step5Decision } from './pages/apply/Step5Decision';
import { Dashboard } from './pages/Dashboard';
import { ComponentTest } from './pages/ComponentTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/apply/step1" element={<Step1Eligibility />} />
        <Route path="/apply/step2" element={<Step2PropertyDetails />} />
        <Route path="/apply/step3" element={<Step3Documents />} />
        <Route path="/apply/step4" element={<Step4Banking />} />
        <Route path="/apply/step5" element={<Step5Decision />} />
        <Route path="/apply/1" element={<OldStep1 />} />
        <Route path="/apply/2" element={<Step2PropertyDetails />} />
        <Route path="/apply/3" element={<Step3Documents />} />
        <Route path="/apply/4" element={<Step4Banking />} />
        <Route path="/apply/5" element={<Step5Decision />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<ComponentTest />} />
      </Routes>
    </Router>
  );
}

export default App;
