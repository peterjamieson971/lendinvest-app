import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Shield, CheckCircle, Building2, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLayout } from '../../components/layout/ApplicationLayout';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const BANKS = [
  { id: 'hsbc', name: 'HSBC', domain: 'hsbc.co.uk', initials: 'H' },
  { id: 'barclays', name: 'Barclays', domain: 'barclays.co.uk', initials: 'B' },
  { id: 'lloyds', name: 'Lloyds', domain: 'lloydsbank.com', initials: 'L' },
  { id: 'natwest', name: 'NatWest', domain: 'natwest.com', initials: 'N' },
  { id: 'santander', name: 'Santander', domain: 'santander.co.uk', initials: 'S' },
  { id: 'nationwide', name: 'Nationwide', domain: 'nationwide.co.uk', initials: 'N' },
  { id: 'rbs', name: 'RBS', domain: 'rbs.co.uk', initials: 'R' },
  { id: 'tsb', name: 'TSB', domain: 'tsb.co.uk', initials: 'T' }
];

interface Bank {
  id: string;
  name: string;
  domain: string;
  initials: string;
}

export const Step4Banking: React.FC = () => {
  const navigate = useNavigate();

  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingProgress, setConnectingProgress] = useState(0);
  const [connectingStatus, setConnectingStatus] = useState('');
  const [connectingSubtext, setConnectingSubtext] = useState('');
  const [bankConnected, setBankConnected] = useState(false);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
  };

  const handleAuthorize = () => {
    setIsConnecting(true);

    // Step 1
    setConnectingStatus('Connecting to ' + selectedBank?.name);
    setConnectingSubtext('Establishing secure connection...');
    setConnectingProgress(20);

    setTimeout(() => {
      setConnectingStatus('Fetching Transactions');
      setConnectingSubtext('Retrieving last 90 days of transactions...');
      setConnectingProgress(40);
    }, 1500);

    setTimeout(() => {
      setConnectingStatus('Analyzing Income');
      setConnectingSubtext('Identifying income sources...');
      setConnectingProgress(60);
    }, 3000);

    setTimeout(() => {
      setConnectingStatus('Calculating Affordability');
      setConnectingSubtext('Processing expenditure patterns...');
      setConnectingProgress(80);
    }, 4500);

    setTimeout(() => {
      setConnectingProgress(100);
      setBankConnected(true);
      setIsConnecting(false);
    }, 6000);
  };

  return (
    <ApplicationLayout currentStep={4}>
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
              Verify your income instantly
            </h1>
            <p className="text-[#64748B]">
              Connect your bank securely via Open Banking to verify your income automatically
            </p>
          </div>

          {!bankConnected ? (
            <>
              {/* Benefits Card */}
              <Card className="p-6 bg-[#F8FAFC]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFB800]/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#FFB800]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-2">Why Open Banking?</h3>
                    <p className="text-[#64748B] mb-4">
                      Open Banking provides instant verification without manual paperwork
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628] text-sm">Instant Verification</p>
                      <p className="text-xs text-[#64748B]">No waiting for documents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628] text-sm">Bank-Level Security</p>
                      <p className="text-xs text-[#64748B]">FCA regulated and encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628] text-sm">Read-Only Access</p>
                      <p className="text-xs text-[#64748B]">We can't move your money</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Connect Button */}
              {!showBankModal && (
                <div className="text-center py-8">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowBankModal(true)}
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Connect Your Bank
                  </Button>
                  <p className="text-sm text-[#64748B] mt-3">
                    This is powered by TrueLayer - FCA regulated Open Banking provider
                  </p>
                </div>
              )}

              {/* Bank Selection Modal */}
              {showBankModal && !selectedBank && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#0A1628]">Select Your Bank</h3>
                    <button
                      onClick={() => setShowBankModal(false)}
                      className="text-[#64748B] hover:text-[#0A1628]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Search */}
                  <Input
                    placeholder="Search for your bank..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />

                  {/* Bank Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {BANKS.filter(bank =>
                      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => handleBankSelect(bank)}
                        className="group p-6 border-2 border-[#E2E8F0] rounded-xl hover:border-[#FFB800] hover:bg-[#FFFBF0] hover:shadow-md transition-all"
                      >
                        <div className="w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center bg-white p-3 border border-[#E2E8F0] group-hover:border-[#FFB800] transition-all">
                          <img
                            src={`https://logo.clearbit.com/${bank.domain}`}
                            alt={bank.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `<span class="font-bold text-[#0A1628] text-lg">${bank.initials}</span>`;
                              }
                            }}
                          />
                        </div>
                        <p className="text-sm font-semibold text-[#0A1628]">{bank.name}</p>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Authorization Screen */}
              {selectedBank && !isConnecting && (
                <Card className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-xl mx-auto mb-4 flex items-center justify-center bg-white border-2 border-[#E2E8F0] p-4 shadow-lg">
                      <img
                        src={`https://logo.clearbit.com/${selectedBank.domain}`}
                        alt={selectedBank.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                      Authorize {selectedBank.name}
                    </h3>
                    <p className="text-[#64748B]">
                      Allow LendInvest to access your transaction history
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#64748B]">Read transaction history (90 days)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#64748B]">View account balances</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#64748B]">Verify income and expenditure</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleAuthorize}
                  >
                    Authorize Connection
                  </Button>

                  <button
                    onClick={() => setSelectedBank(null)}
                    className="w-full mt-3 text-sm text-[#64748B] hover:text-[#0A1628]"
                  >
                    Choose different bank
                  </button>
                </Card>
              )}

              {/* Connecting State */}
              {isConnecting && (
                <Card className="p-8">
                  <div className="text-center space-y-6">
                    <LoadingSpinner size="lg" />
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                        {connectingStatus}
                      </h3>
                      <p className="text-[#64748B]">{connectingSubtext}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                      <div
                        className="bg-[#FFB800] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${connectingProgress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <>
              {/* Success Result */}
              <Card highlighted className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg border-2 border-[#10B981] flex items-center justify-center p-3">
                    <img
                      src={`https://logo.clearbit.com/${selectedBank?.domain}`}
                      alt={selectedBank?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-[#0A1628]">
                        Bank Connected Successfully
                      </h3>
                      <Badge variant="success">Verified ✓</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-[#64748B] mb-1">Bank</p>
                        <p className="text-lg font-bold text-[#0A1628]">{selectedBank?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B] mb-1">Account Type</p>
                        <p className="text-lg font-bold text-[#0A1628]">Current Account</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B] mb-1">Data Analyzed</p>
                        <p className="text-lg font-bold text-[#0A1628]">90 Days</p>
                      </div>
                    </div>

                    {/* Analysis Results */}
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Monthly Income Verified:</span>
                        <span className="font-bold text-[#0A1628]">£4,850</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Average Monthly Expenditure:</span>
                        <span className="font-bold text-[#0A1628]">£2,100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Debt Obligations:</span>
                        <span className="font-bold text-[#0A1628]">£600</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                        <span className="text-[#64748B] font-semibold">Affordability Score:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[#0A1628]">8.5</span>
                          <span className="text-[#64748B]">/ 10</span>
                        </div>
                      </div>
                    </div>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="success">Income Verified ✓</Badge>
                      <Badge variant="success">Expenditure Analyzed ✓</Badge>
                      <Badge variant="success">Affordability Confirmed ✓</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" onClick={() => navigate('/apply/step3')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/apply/step5')}
              disabled={!bankConnected}
            >
              Continue to Decision
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </ApplicationLayout>
  );
};
