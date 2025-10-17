import React from 'react';
import { Building2 } from 'lucide-react';
import { ProgressStepper } from '../common/ProgressStepper';
import { useNavigate } from 'react-router-dom';

interface ApplicationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const steps = [
  { label: 'Eligibility', description: 'Basic details' },
  { label: 'Property', description: 'Property info' },
  { label: 'Documents', description: 'Upload files' },
  { label: 'Banking', description: 'Open Banking' },
  { label: 'Decision', description: 'AI review' }
];

export const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ children, currentStep }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <img
                src="https://cdn.mortgagestrategy.co.uk/content/uploads/2016/05/LendInvest-logo--768x270.gif"
                alt="LendInvest"
                className="h-10"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const fallback = document.createElement('div');
                    fallback.className = 'flex items-center gap-2';
                    fallback.innerHTML = '<svg class="w-8 h-8 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="text-2xl font-bold text-[#0A1628]">LendInvest</span>';
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
            </div>
            <button className="text-sm text-[#64748B] hover:text-[#0A1628] transition-colors">
              Save & Exit
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
    </div>
  );
};
