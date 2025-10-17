import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { ApplicationLayout } from '../../components/layout/ApplicationLayout';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { RadioGroup } from '../../components/common/RadioGroup';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';

export const Step1Eligibility: React.FC = () => {
  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [timeline, setTimeline] = useState('');

  // Calculate LTV
  const ltv = useMemo(() => {
    const value = parseInt(propertyValue.replace(/,/g, '')) || 0;
    const loan = parseInt(loanAmount.replace(/,/g, '')) || 0;
    if (value === 0) return 0;
    return Math.round((loan / value) * 100);
  }, [propertyValue, loanAmount]);

  // Calculate max loan
  const maxLoan = useMemo(() => {
    const value = parseInt(propertyValue.replace(/,/g, '')) || 0;
    return Math.floor(value * 0.75);
  }, [propertyValue]);

  // Check if form is valid
  const isValid = useMemo(() => {
    return !!(
      propertyType &&
      propertyValue &&
      loanAmount &&
      purpose &&
      timeline &&
      parseInt(propertyValue.replace(/,/g, '')) > 0 &&
      ltv <= 75
    );
  }, [propertyType, propertyValue, loanAmount, purpose, timeline, ltv]);

  const handleContinue = () => {
    if (isValid) {
      navigate('/apply/step2');
    }
  };

  return (
    <ApplicationLayout currentStep={1}>
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
              Let's start with the basics
            </h1>
            <p className="text-[#64748B]">
              This will only take 2 minutes
            </p>
          </div>

          <RadioGroup
            label="Property Type"
            options={[
              { value: 'residential', label: 'Residential', description: 'Houses, flats, or apartments' },
              { value: 'commercial', label: 'Commercial', description: 'Shops, offices, or warehouses' },
              { value: 'semi-commercial', label: 'Semi-Commercial', description: 'Mixed use properties' }
            ]}
            value={propertyType}
            onChange={setPropertyType}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Property Value"
              prefix="£"
              type="text"
              placeholder="300,000"
              helpText="Enter current or expected value"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
            />

            <Input
              label="Loan Amount Required"
              prefix="£"
              type="text"
              placeholder="200,000"
              helpText={`Maximum: £${maxLoan.toLocaleString()} (75% LTV)`}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          {/* Show LTV calculation */}
          {propertyValue && loanAmount && (
            <div className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0A1628]">Loan-to-Value (LTV):</span>
              <Badge variant={ltv <= 75 ? 'success' : ltv <= 80 ? 'warning' : 'error'}>
                {ltv}%
              </Badge>
            </div>
          )}

          <Select
            label="Loan Purpose"
            options={[
              { value: 'purchase', label: 'Property Purchase' },
              { value: 'refinance', label: 'Refinancing' },
              { value: 'renovation', label: 'Renovation' },
              { value: 'auction', label: 'Bridge to Auction' }
            ]}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <Select
            label="How soon do you need the funds?"
            options={[
              { value: '<1', label: 'Less than 1 month' },
              { value: '1-3', label: '1-3 months' },
              { value: '3-6', label: '3-6 months' },
              { value: '6+', label: '6+ months' }
            ]}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" disabled>
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
