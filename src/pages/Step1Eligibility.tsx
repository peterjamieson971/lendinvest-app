import React, { useState } from 'react';
import { ApplicationLayout } from '../components/layout/ApplicationLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { RadioGroup } from '../components/common/RadioGroup';
import { Badge } from '../components/common/Badge';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Step1Eligibility: React.FC = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState('');
  const [propertyValue, setPropertyValue] = useState('300000');
  const [loanAmount, setLoanAmount] = useState('200000');
  const [purpose, setPurpose] = useState('');
  const [timeline, setTimeline] = useState('');

  const calculateLTV = () => {
    const ltv = (parseInt(loanAmount) / parseInt(propertyValue)) * 100;
    return ltv.toFixed(1);
  };

  const getLTVStatus = () => {
    const ltv = parseFloat(calculateLTV());
    if (ltv <= 65) return { variant: 'success' as const, text: 'Excellent LTV' };
    if (ltv <= 75) return { variant: 'info' as const, text: 'Good LTV' };
    return { variant: 'warning' as const, text: 'High LTV - May require additional security' };
  };

  const handleContinue = () => {
    navigate('/apply/2');
  };

  return (
    <ApplicationLayout currentStep={1}>
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
          Eligibility Check
        </h1>
        <p className="text-[#64748B] mb-8">
          Let's start with some basic details about your property and loan requirements.
        </p>

        <form className="space-y-6">
          <RadioGroup
            label="Property Type"
            options={[
              { value: 'residential', label: 'Residential', description: 'Houses, flats, or apartments' },
              { value: 'commercial', label: 'Commercial', description: 'Shops, offices, or warehouses' },
              { value: 'semi-commercial', label: 'Semi-Commercial', description: 'Mixed residential and commercial use' },
              { value: 'land', label: 'Land', description: 'Undeveloped or development land' }
            ]}
            value={propertyType}
            onChange={setPropertyType}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Property Value"
              type="number"
              prefix="£"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              helpText="Current or expected value"
            />
            <Input
              label="Loan Amount"
              type="number"
              prefix="£"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              helpText="How much you need"
            />
          </div>

          {/* LTV Indicator */}
          {propertyValue && loanAmount && (
            <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-semibold text-[#0A1628] mb-1">Loan-to-Value (LTV)</p>
                  <p className="text-3xl font-bold text-[#0A1628]">{calculateLTV()}%</p>
                </div>
                <Badge variant={getLTVStatus().variant}>{getLTVStatus().text}</Badge>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                <div
                  className="bg-[#FFB800] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(calculateLTV()), 100)}%` }}
                />
              </div>
              <p className="text-xs text-[#64748B] mt-2">
                Maximum LTV typically 75% for most properties
              </p>
            </div>
          )}

          <Select
            label="Loan Purpose"
            options={[
              { value: 'purchase', label: 'Property Purchase' },
              { value: 'refinance', label: 'Refinancing Existing Loan' },
              { value: 'development', label: 'Property Development' },
              { value: 'renovation', label: 'Property Renovation' },
              { value: 'auction', label: 'Auction Purchase' }
            ]}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <Select
            label="When do you need the funds?"
            options={[
              { value: 'urgent', label: 'Within 2 weeks (Urgent)' },
              { value: 'month', label: '1 month' },
              { value: 'two-months', label: '2-3 months' },
              { value: 'flexible', label: 'Flexible timeline' }
            ]}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            helpText="We can expedite urgent applications"
          />

          {/* Eligibility Summary */}
          <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#0A1628] mb-3">Initial Assessment</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Estimated Monthly Interest (0.75%)</span>
                <span className="font-semibold text-[#0A1628]">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format((parseInt(loanAmount) * 0.0075))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Estimated Arrangement Fee (2%)</span>
                <span className="font-semibold text-[#0A1628]">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format((parseInt(loanAmount) * 0.02))}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#FFB800]">
                <span className="text-sm font-semibold text-[#0A1628]">Total First Month</span>
                <span className="font-bold text-[#0A1628] text-lg">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format((parseInt(loanAmount) * 0.0075) + (parseInt(loanAmount) * 0.02))}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" icon={<ArrowLeft />} onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button
              variant="primary"
              icon={<ArrowRight />}
              onClick={handleContinue}
              disabled={!propertyType || !purpose || !timeline}
            >
              Continue
            </Button>
          </div>
        </form>
      </Card>
    </ApplicationLayout>
  );
};
