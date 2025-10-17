import React, { useState, useEffect } from 'react';
import { ApplicationLayout } from '../components/layout/ApplicationLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowRight, CheckCircle2, Building2, Calendar, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Step5Decision: React.FC = () => {
  const navigate = useNavigate();
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const analysisSteps = [
    { label: 'Property valuation assessment', icon: Building2 },
    { label: 'Financial background verification', icon: TrendingUp },
    { label: 'Credit profile analysis', icon: Shield },
    { label: 'Risk modeling & compliance', icon: CheckCircle2 },
    { label: 'Final decision processing', icon: Sparkles }
  ];

  useEffect(() => {
    if (analysisStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setAnalysisStep(analysisStep + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (analysisStep === analysisSteps.length && !isApproved) {
      setTimeout(() => {
        setIsApproved(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 1000);
    }
  }, [analysisStep, isApproved]);

  return (
    <ApplicationLayout currentStep={5}>
      {!isApproved ? (
        <Card className="p-8">
          <div className="text-center py-12">
            <div className="mb-8">
              <LoadingSpinner size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-4">
              AI Analysis In Progress
            </h1>
            <p className="text-lg text-[#64748B] mb-12">
              Our AI is reviewing your application. This usually takes 30-60 seconds.
            </p>

            {/* Analysis Steps */}
            <div className="max-w-md mx-auto space-y-4">
              {analysisSteps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = index < analysisStep;
                const isCurrent = index === analysisStep;

                return (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-500
                      ${isComplete ? 'border-[#10B981] bg-[#D1FAE5]' : ''}
                      ${isCurrent ? 'border-[#FFB800] bg-[#FFFBF0]' : ''}
                      ${!isComplete && !isCurrent ? 'border-[#E2E8F0] bg-white' : ''}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${isComplete ? 'bg-[#10B981]' : ''}
                      ${isCurrent ? 'bg-[#FFB800]' : ''}
                      ${!isComplete && !isCurrent ? 'bg-[#F8FAFC]' : ''}
                    `}>
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isCurrent ? (
                        <LoadingSpinner size="sm" color="#0A1628" />
                      ) : (
                        <Icon className="w-5 h-5 text-[#94A3B8]" />
                      )}
                    </div>
                    <p className={`
                      text-left font-medium flex-1
                      ${isComplete ? 'text-[#065F46]' : ''}
                      ${isCurrent ? 'text-[#0A1628]' : ''}
                      ${!isComplete && !isCurrent ? 'text-[#94A3B8]' : ''}
                    `}>
                      {step.label}
                    </p>
                    {isComplete && <Badge variant="success">Complete</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      ) : (
        <div className="relative">
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: '2s'
                  }}
                >
                  {['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)]}
                </div>
              ))}
            </div>
          )}

          <Card className="p-8">
            {/* Approval Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#10B981] rounded-full mb-6 animate-bounce">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-[#0A1628] mb-4">
                Congratulations!
              </h1>
              <p className="text-2xl text-[#10B981] font-bold mb-2">
                YOUR LOAN HAS BEEN APPROVED
              </p>
              <p className="text-lg text-[#64748B]">
                You've been pre-approved for your bridging loan
              </p>
            </div>

            {/* Offer Details */}
            <div className="bg-gradient-to-br from-[#FFB800] to-[#FFCA33] rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Your Loan Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm opacity-90 text-[#0A1628] mb-1">Approved Amount</p>
                  <p className="text-4xl font-bold text-[#0A1628]">£200,000</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 text-[#0A1628] mb-1">Interest Rate</p>
                  <p className="text-4xl font-bold text-[#0A1628]">0.75%</p>
                  <p className="text-sm opacity-90 text-[#0A1628]">per month</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 text-[#0A1628] mb-1">Term</p>
                  <p className="text-2xl font-bold text-[#0A1628]">12 months</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 text-[#0A1628] mb-1">LTV</p>
                  <p className="text-2xl font-bold text-[#0A1628]">66.7%</p>
                </div>
              </div>
            </div>

            {/* Why Approved */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#0A1628] mb-4">Why You Were Approved</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 border-2 border-[#10B981]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628]">Strong Financial Profile</p>
                      <p className="text-sm text-[#64748B]">Verified income of £5,200/month</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-2 border-[#10B981]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628]">Excellent Credit History</p>
                      <p className="text-sm text-[#64748B]">Credit score in excellent range</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-2 border-[#10B981]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628]">Suitable LTV Ratio</p>
                      <p className="text-sm text-[#64748B]">66.7% LTV is within safe limits</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-2 border-[#10B981]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0A1628]">Property Investment Experience</p>
                      <p className="text-sm text-[#64748B]">Proven track record</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#FFB800]" />
                What Happens Next
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Case Manager Assignment (Today)</p>
                    <p className="text-sm text-[#64748B]">Your dedicated case manager will contact you within 2 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Legal Process (Days 1-3)</p>
                    <p className="text-sm text-[#64748B]">Legal checks and property surveys arranged</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Final Valuation (Days 4-5)</p>
                    <p className="text-sm text-[#64748B]">Professional property valuation completed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#FFB800] text-[#0A1628] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">Funds Released (Days 5-7)</p>
                    <p className="text-sm text-[#64748B]">Money transferred to your account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight />}
                onClick={() => navigate('/dashboard')}
                className="text-lg px-12"
              >
                View Your Dashboard
              </Button>
              <p className="text-sm text-[#64748B] mt-4">
                Track your application progress and communicate with your case manager
              </p>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-6 bg-[#DBEAFE] border-2 border-[#3B82F6] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#1E40AF] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-[#1E3A8A]">
                <p className="font-semibold mb-1">This is a pre-approval</p>
                <p>Final approval is subject to property valuation and legal checks. Your case manager will guide you through the process.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ApplicationLayout>
  );
};
