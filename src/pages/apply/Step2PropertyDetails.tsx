import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Home, CheckCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLayout } from '../../components/layout/ApplicationLayout';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const Step2PropertyDetails: React.FC = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [showValuation, setShowValuation] = useState(false);
  const [isLoadingValuation, setIsLoadingValuation] = useState(false);
  const [mockValuation, setMockValuation] = useState(0);
  const [ownership, setOwnership] = useState('');
  const [income, setIncome] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');

  // Credit check states
  const [creditCheckComplete, setCreditCheckComplete] = useState(false);
  const [isCheckingCredit, setIsCheckingCredit] = useState(false);
  const [mockCreditScore, setMockCreditScore] = useState(0);
  const [mockCreditRating, setMockCreditRating] = useState('');

  const generatePropertyDescription = (addr: string, value: number): string => {
    // Extract area/street info from address
    const isLondon = addr.toLowerCase().includes('london');
    const isKensington = addr.toLowerCase().includes('kensington');

    if (isKensington || value > 300000) {
      return "Victorian terraced property in prime location. Recently renovated with modern kitchen and bathrooms. Features include high ceilings, original period details, and excellent natural light. Property benefits from private rear garden and proximity to local amenities.";
    } else if (isLondon) {
      return "Well-maintained property in residential area with good transport links. Modern fixtures and fittings throughout. Suitable for family living with good local schools and parks nearby. Property offers potential for further improvement.";
    } else {
      return "Attractive property in established neighborhood. Well-proportioned rooms with modern amenities. Benefits from off-street parking and good-sized garden. Close to local shops, schools, and transport connections.";
    }
  };

  const handleGetValuation = () => {
    setIsLoadingValuation(true);
    setShowValuation(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * (320000 - 280000) + 280000);
      setMockValuation(val);

      // Auto-generate property description based on address
      const autoDescription = generatePropertyDescription(address, val);
      setDescription(autoDescription);

      setIsLoadingValuation(false);
    }, 2000);
  };

  const handleCreditCheck = () => {
    setIsCheckingCredit(true);
    setTimeout(() => {
      // Generate mock credit score (680-780 for good applicants)
      const score = Math.floor(Math.random() * (780 - 680) + 680);
      setMockCreditScore(score);

      // Determine rating
      let rating = '';
      if (score >= 750) rating = 'Excellent';
      else if (score >= 700) rating = 'Very Good';
      else if (score >= 650) rating = 'Good';
      else rating = 'Fair';

      setMockCreditRating(rating);
      setCreditCheckComplete(true);
      setIsCheckingCredit(false);
    }, 3000);
  };

  // Form validation
  const isValid = useMemo(() => {
    return !!(
      address &&
      ownership &&
      income &&
      creditCheckComplete &&
      experience &&
      description &&
      parseInt(income.replace(/,/g, '')) > 0
    );
  }, [address, ownership, income, creditCheckComplete, experience, description]);

  const handleContinue = () => {
    if (isValid) {
      navigate('/apply/step3');
    }
  };

  return (
    <ApplicationLayout currentStep={2}>
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
              Tell us about the property
            </h1>
            <p className="text-[#64748B]">
              We'll use this to provide an accurate assessment
            </p>
          </div>

          {/* Property Address - Full width */}
          <Input
            label="Property Address"
            type="text"
            placeholder="Start typing address..."
            helpText="Enter the full property address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Mock Valuation Feature */}
          {address.length > 10 && !showValuation && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleGetValuation}
            >
              Get Instant Valuation
            </Button>
          )}

          {showValuation && (
            <>
              {isLoadingValuation ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="lg" />
                  <span className="ml-3 text-[#64748B]">Analyzing property...</span>
                </div>
              ) : (
                <Card highlighted className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FFB800]/10 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-[#FFB800]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#0A1628]">Property Valuation</h3>
                        <Badge variant="success">Verified ✓</Badge>
                      </div>
                      <div className="text-3xl font-bold text-[#0A1628] mb-2">
                        £{mockValuation.toLocaleString()}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[#64748B]">Confidence:</span>
                          <span className="ml-2 font-semibold text-[#0A1628]">92%</span>
                        </div>
                        <div>
                          <span className="text-[#64748B]">Last Updated:</span>
                          <span className="ml-2 font-semibold text-[#0A1628]">Today</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Current Ownership Status"
              options={[
                { value: 'own', label: 'I own it' },
                { value: 'offer', label: 'Under offer' },
                { value: 'identified', label: 'Not yet identified' }
              ]}
              value={ownership}
              onChange={(e) => setOwnership(e.target.value)}
            />

            <Input
              label="Monthly Income"
              prefix="£"
              type="text"
              placeholder="4,500"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          {/* Credit Check */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-[#0A1628]">
              Credit Check
            </label>

            {!creditCheckComplete ? (
              <div className="border-2 border-[#E2E8F0] rounded-lg p-6 text-center">
                {isCheckingCredit ? (
                  <div className="flex flex-col items-center gap-3">
                    <LoadingSpinner size="md" />
                    <p className="text-[#64748B]">Running soft credit check...</p>
                    <p className="text-sm text-[#94A3B8]">This won't affect your credit score</p>
                  </div>
                ) : (
                  <div>
                    <Shield className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
                    <p className="text-[#64748B] mb-4">We need to verify your credit profile</p>
                    <Button variant="secondary" onClick={handleCreditCheck}>
                      <Shield className="w-5 h-5 mr-2" />
                      Run Soft Credit Check
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card highlighted className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#0A1628]">Credit Check Complete</h3>
                      <Badge variant="success">Verified ✓</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#64748B]">Credit Score:</p>
                        <p className="text-2xl font-bold text-[#0A1628]">{mockCreditScore}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Rating:</p>
                        <p className="text-lg font-semibold text-[#0A1628]">{mockCreditRating}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B] mt-3">
                      This was a soft check and won't affect your credit score
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Investment Experience */}
          <Select
            label="Property Investment Experience"
            options={[
              { value: 'first', label: 'First time investor' },
              { value: '1-3', label: '1-3 properties' },
              { value: '4-10', label: '4-10 properties' },
              { value: '10+', label: '10+ properties (experienced)' }
            ]}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          {/* Property Description - Full width textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-[#0A1628]">
                Property Description
              </label>
              {description && (
                <Badge variant="info">Auto-generated • Editable</Badge>
              )}
            </div>
            <textarea
              className="w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] focus:ring-opacity-20 focus:outline-none transition-all duration-200 resize-none"
              rows={4}
              placeholder="Property description will be generated automatically from valuation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="mt-2 text-sm text-[#64748B]">
              Edit if needed to add specific details
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" onClick={() => navigate('/apply/step1')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={!isValid}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </ApplicationLayout>
  );
};
