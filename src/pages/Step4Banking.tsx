import React, { useState } from 'react';
import { ApplicationLayout } from '../components/layout/ApplicationLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowRight, ArrowLeft, Shield, Lock, CheckCircle2, TrendingUp, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Step4Banking: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStep, setConnectionStep] = useState('');

  const banks = [
    { name: 'HSBC', logo: '🏦' },
    { name: 'Barclays', logo: '🏦' },
    { name: 'Lloyds', logo: '🏦' },
    { name: 'NatWest', logo: '🏦' },
    { name: 'Santander', logo: '🏦' },
    { name: 'Nationwide', logo: '🏦' },
    { name: 'TSB', logo: '🏦' },
    { name: 'Metro Bank', logo: '🏦' }
  ];

  const handleBankSelect = (bankName: string) => {
    setIsModalOpen(false);
    setIsConnecting(true);
    setConnectionStep('Connecting to ' + bankName + '...');

    // Simulate connection flow
    setTimeout(() => {
      setConnectionStep('Authorizing access...');
    }, 1500);

    setTimeout(() => {
      setConnectionStep('Analyzing transactions...');
    }, 3000);

    setTimeout(() => {
      setConnectionStep('Verifying income...');
    }, 4500);

    setTimeout(() => {
      setConnectionStep('');
      setIsConnecting(false);
      setIsConnected(true);
    }, 6000);
  };

  const handleContinue = () => {
    navigate('/apply/5');
  };

  return (
    <ApplicationLayout currentStep={4}>
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
          Open Banking Integration
        </h1>
        <p className="text-[#64748B] mb-8">
          Connect your bank account for instant income verification. This speeds up your application significantly.
        </p>

        {!isConnecting && !isConnected && (
          <>
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-4">
                <Shield className="w-8 h-8 text-[#FFB800] mb-3" />
                <h3 className="font-bold text-[#0A1628] mb-2">Bank-Grade Security</h3>
                <p className="text-sm text-[#64748B]">FCA regulated. We never see your login details.</p>
              </div>
              <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-4">
                <TrendingUp className="w-8 h-8 text-[#FFB800] mb-3" />
                <h3 className="font-bold text-[#0A1628] mb-2">Instant Verification</h3>
                <p className="text-sm text-[#64748B]">No need to upload bank statements manually.</p>
              </div>
              <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-4">
                <CheckCircle2 className="w-8 h-8 text-[#FFB800] mb-3" />
                <h3 className="font-bold text-[#0A1628] mb-2">Faster Decision</h3>
                <p className="text-sm text-[#64748B]">Get approved up to 3 days faster.</p>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-[#0A1628] mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Choose Your Bank</p>
                    <p className="text-sm text-[#64748B]">Select from our list of supported banks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Secure Authorization</p>
                    <p className="text-sm text-[#64748B]">Authorize read-only access via your bank</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Instant Analysis</p>
                    <p className="text-sm text-[#64748B]">Our AI analyzes your transactions and income</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Building2 />}
              onClick={() => setIsModalOpen(true)}
            >
              Connect Your Bank
            </Button>

            {/* Skip Option */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/apply/5')}
                className="text-sm text-[#64748B] hover:text-[#0A1628] underline transition-colors"
              >
                Skip this step (will require manual document review)
              </button>
            </div>
          </>
        )}

        {/* Connecting State */}
        {isConnecting && (
          <div className="py-12 text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-6 text-xl font-semibold text-[#0A1628]">{connectionStep}</p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="space-y-3 text-left">
                <div className={`flex items-center gap-3 transition-opacity ${connectionStep.includes('Connecting') ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="w-6 h-6 rounded-full bg-[#FFB800] flex items-center justify-center">
                    {connectionStep.includes('Connecting') ? (
                      <LoadingSpinner size="sm" color="#0A1628" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#0A1628]" />
                    )}
                  </div>
                  <span className="text-sm text-[#64748B]">Connecting to your bank...</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${connectionStep.includes('Analyzing') ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="w-6 h-6 rounded-full bg-[#FFB800] flex items-center justify-center">
                    {connectionStep.includes('Analyzing') ? (
                      <LoadingSpinner size="sm" color="#0A1628" />
                    ) : connectionStep.includes('Verifying') || !connectionStep.includes('Connecting') ? (
                      <CheckCircle2 className="w-4 h-4 text-[#0A1628]" />
                    ) : (
                      <div className="w-2 h-2 bg-[#0A1628] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-[#64748B]">Analyzing transactions...</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${connectionStep.includes('Verifying') ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="w-6 h-6 rounded-full bg-[#FFB800] flex items-center justify-center">
                    {connectionStep.includes('Verifying') ? (
                      <LoadingSpinner size="sm" color="#0A1628" />
                    ) : (
                      <div className="w-2 h-2 bg-[#0A1628] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-[#64748B]">Verifying income...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connected State */}
        {isConnected && (
          <div>
            <div className="bg-[#D1FAE5] border-2 border-[#10B981] rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#065F46] mb-2">Bank Account Connected!</h3>
                  <p className="text-[#064E3B]">We've successfully analyzed your banking data.</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A1628]">Income Verified</h3>
                  <Badge variant="success">✓ Verified</Badge>
                </div>
                <p className="text-3xl font-bold text-[#0A1628] mb-2">£5,200/mo</p>
                <p className="text-sm text-[#64748B]">Average monthly income (last 3 months)</p>
                <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">Regularity</span>
                    <span className="font-semibold text-[#10B981]">Consistent</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A1628]">Expenditure Analyzed</h3>
                  <Badge variant="success">✓ Healthy</Badge>
                </div>
                <p className="text-3xl font-bold text-[#0A1628] mb-2">£2,800/mo</p>
                <p className="text-sm text-[#64748B]">Average monthly expenditure</p>
                <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">Disposable Income</span>
                    <span className="font-semibold text-[#10B981]">£2,400/mo</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Affordability Score */}
            <div className="bg-gradient-to-br from-[#FFB800] to-[#FFCA33] rounded-xl p-6 text-[#0A1628] mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Affordability Score</p>
                  <p className="text-5xl font-bold">8.5/10</p>
                  <p className="text-sm opacity-90 mt-2">Excellent financial profile</p>
                </div>
                <div className="text-right">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Income Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Spending Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">No Red Flags</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
              <Button variant="ghost" icon={<ArrowLeft />} onClick={() => navigate('/apply/3')}>
                Back
              </Button>
              <Button variant="primary" icon={<ArrowRight />} onClick={handleContinue}>
                Continue to Final Review
              </Button>
            </div>
          </div>
        )}

        {!isConnecting && !isConnected && (
          <div className="flex justify-between items-center pt-8 border-t border-[#E2E8F0] mt-8">
            <Button variant="ghost" icon={<ArrowLeft />} onClick={() => navigate('/apply/3')}>
              Back
            </Button>
          </div>
        )}
      </Card>

      {/* Bank Selection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Your Bank"
        size="lg"
      >
        <div className="mb-6 flex items-start gap-3 bg-[#DBEAFE] border border-[#3B82F6] rounded-lg p-4">
          <Lock className="w-5 h-5 text-[#1E40AF] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#1E3A8A]">
            <p className="font-semibold mb-1">Your data is secure</p>
            <p>We use FCA-regulated Open Banking. We never see your login details and only access read-only transaction data.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {banks.map((bank) => (
            <button
              key={bank.name}
              onClick={() => handleBankSelect(bank.name)}
              className="p-4 border-2 border-[#E2E8F0] rounded-lg hover:border-[#FFB800] hover:bg-[#FFFBF0] transition-all duration-200 text-center"
            >
              <div className="text-3xl mb-2">{bank.logo}</div>
              <p className="text-sm font-semibold text-[#0A1628]">{bank.name}</p>
            </button>
          ))}
        </div>
      </Modal>
    </ApplicationLayout>
  );
};
