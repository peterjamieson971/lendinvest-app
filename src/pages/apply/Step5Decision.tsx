import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Eye, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLayout } from '../../components/layout/ApplicationLayout';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const AI_CHECKS = [
  { id: 1, label: 'Property Valuation Analysis', duration: 2000 },
  { id: 2, label: 'Financial Assessment', duration: 2000 },
  { id: 3, label: 'Credit Risk Evaluation', duration: 1000 },
  { id: 4, label: 'AI Risk Modeling', duration: 3000 },
  { id: 5, label: 'Regulatory Compliance Check', duration: 1000 }
];

const NEXT_STEPS = [
  { id: 1, label: 'Legal Review', description: 'Our legal team will review your application', timeline: '24 hours' },
  { id: 2, label: 'Valuation Survey', description: 'Independent surveyor will assess the property', timeline: '2-3 days' },
  { id: 3, label: 'Final Approval', description: 'Final underwriting decision', timeline: '4-5 days' },
  { id: 4, label: 'Legal Completion', description: 'Solicitors complete legal documentation', timeline: '5-7 days' },
  { id: 5, label: 'Funds Released', description: 'Money transferred to your account', timeline: '7 days' }
];

export const Step5Decision: React.FC = () => {
  const navigate = useNavigate();

  const [currentCheck, setCurrentCheck] = useState(0);
  const [decisionComplete, setDecisionComplete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (currentCheck < AI_CHECKS.length) {
      const timer = setTimeout(() => {
        setCurrentCheck(currentCheck + 1);
      }, AI_CHECKS[currentCheck].duration);

      return () => clearTimeout(timer);
    } else if (currentCheck === AI_CHECKS.length && !decisionComplete) {
      // All checks complete - show dramatic reveal
      setTimeout(() => {
        setDecisionComplete(true);
      }, 500);

      // Then show details
      setTimeout(() => {
        setShowDetails(true);
      }, 2500);
    }
  }, [currentCheck, decisionComplete]);

  return (
    <ApplicationLayout currentStep={5}>
      <Card className="p-8">
        <div className="space-y-8">
          {/* Analysis Phase */}
          {!decisionComplete && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
                  Analyzing Your Application
                </h1>
                <p className="text-[#64748B]">
                  Our AI is performing comprehensive risk assessment
                </p>
              </div>

              {/* AI Checks Progress */}
              <div className="space-y-4">
                {AI_CHECKS.map((check, index) => (
                  <Card
                    key={check.id}
                    className={`p-4 transition-all duration-500 ${
                      index < currentCheck
                        ? 'bg-[#FFFBF0] border-[#FFB800]'
                        : index === currentCheck
                        ? 'bg-white border-[#FFB800] shadow-lg'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {index < currentCheck ? (
                          <CheckCircle className="w-8 h-8 text-[#10B981]" />
                        ) : index === currentCheck ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-[#E2E8F0]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0A1628]">{check.label}</p>
                      </div>
                      {index < currentCheck && (
                        <Badge variant="success">Complete ✓</Badge>
                      )}
                      {index === currentCheck && (
                        <Badge variant="warning">Analyzing...</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Dramatic Approval Reveal */}
          {decisionComplete && !showDetails && (
            <div className="text-center py-16 animate-scaleIn">
              <div className="w-32 h-32 mx-auto mb-6 bg-[#10B981] rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-[#0A1628] mb-4">
                APPROVED
              </h1>
              <p className="text-xl text-[#64748B]">
                Congratulations! Your application has been approved
              </p>
            </div>
          )}

          {/* Offer Details */}
          {showDetails && (
            <div className="space-y-6 animate-slideUp">
              {/* Approval Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-3xl font-bold text-[#0A1628]">
                      Application Approved
                    </h1>
                    <p className="text-[#64748B]">Decision made in 9 seconds</p>
                  </div>
                </div>
              </div>

              {/* Loan Offer Card */}
              <Card highlighted className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Your Loan Offer</h2>
                  <p className="text-[#64748B]">Subject to final valuation and legal review</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-sm text-[#64748B] mb-1">Loan Amount</p>
                    <p className="text-3xl font-bold text-[#0A1628]">£200,000</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-sm text-[#64748B] mb-1">Interest Rate</p>
                    <p className="text-3xl font-bold text-[#0A1628]">0.75%</p>
                    <p className="text-xs text-[#64748B]">per month</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-sm text-[#64748B] mb-1">Completion</p>
                    <p className="text-3xl font-bold text-[#0A1628]">5-7</p>
                    <p className="text-xs text-[#64748B]">business days</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-white rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">LTV:</span>
                    <span className="font-semibold text-[#0A1628]">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Term:</span>
                    <span className="font-semibold text-[#0A1628]">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Arrangement Fee:</span>
                    <span className="font-semibold text-[#0A1628]">2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Exit Fee:</span>
                    <span className="font-semibold text-[#0A1628]">1%</span>
                  </div>
                </div>
              </Card>

              {/* Why We Approved You - Transparency */}
              <Card className="p-6 bg-[#F8FAFC]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFB800]/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#FFB800]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                      Why We Approved You
                    </h3>
                    <p className="text-[#64748B] text-sm mb-4">
                      Our AI analyzed 127 data points. Here's what made you a strong candidate:
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#0A1628]">Overall Risk Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-[#0A1628]">84</span>
                      <span className="text-[#64748B]">/ 100</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-3">
                    <div className="bg-[#10B981] h-3 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mb-2" />
                    <p className="font-semibold text-[#0A1628] text-sm mb-1">Strong Credit Profile</p>
                    <p className="text-xs text-[#64748B]">Credit score 773 (Excellent)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mb-2" />
                    <p className="font-semibold text-[#0A1628] text-sm mb-1">Verified Income</p>
                    <p className="text-xs text-[#64748B]">£4,850/month via Open Banking</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mb-2" />
                    <p className="font-semibold text-[#0A1628] text-sm mb-1">Property Valuation</p>
                    <p className="text-xs text-[#64748B]">£314,773 (92% confidence)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mb-2" />
                    <p className="font-semibold text-[#0A1628] text-sm mb-1">Clear Exit Strategy</p>
                    <p className="text-xs text-[#64748B]">Refinance with Nationwide</p>
                  </div>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFB800]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#FFB800]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                      What Happens Next
                    </h3>
                    <p className="text-[#64748B] text-sm">
                      Your application moves to our operations team for final processing
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {NEXT_STEPS.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#FFB800] text-white font-bold flex items-center justify-center">
                          {step.id}
                        </div>
                        {index < NEXT_STEPS.length - 1 && (
                          <div className="w-0.5 h-12 bg-[#E2E8F0] my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-[#0A1628]">{step.label}</p>
                          <Badge variant="neutral">{step.timeline}</Badge>
                        </div>
                        <p className="text-sm text-[#64748B]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Button */}
              <div className="text-center pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-[#64748B] mt-3">
                  You'll receive updates via email and SMS
                </p>
              </div>
            </div>
          )}

          {/* Footer - only show if not in approval reveal */}
          {(!decisionComplete || showDetails) && (
            <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
              <Button variant="ghost" onClick={() => navigate('/apply/step4')}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ApplicationLayout>
  );
};
