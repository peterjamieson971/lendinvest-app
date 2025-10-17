import React, { useState } from 'react';
import { ApplicationLayout } from '../components/layout/ApplicationLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowRight, ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Step2PropertyDetails: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [income, setIncome] = useState('');
  const [creditRating, setCreditRating] = useState('');
  const [experience, setExperience] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsValidated(false);
  };

  const validateAddress = () => {
    setIsValidating(true);
    // Simulate API call
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
    }, 2000);
  };

  const handleContinue = () => {
    navigate('/apply/3');
  };

  return (
    <ApplicationLayout currentStep={2}>
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
          Property & Financial Details
        </h1>
        <p className="text-[#64748B] mb-8">
          Tell us more about the property and your financial situation.
        </p>

        <form className="space-y-6">
          {/* Property Address */}
          <div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  label="Property Address"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter full address or postcode"
                  icon={<MapPin className="w-5 h-5" />}
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  onClick={validateAddress}
                  disabled={!address || isValidating || isValidated}
                  className="whitespace-nowrap"
                >
                  {isValidating ? 'Validating...' : isValidated ? 'Validated ✓' : 'Validate'}
                </Button>
              </div>
            </div>

            {/* Validation Animation */}
            {isValidating && (
              <div className="mt-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-[#64748B]">Validating address with Royal Mail...</span>
                </div>
              </div>
            )}

            {/* Validated Result */}
            {isValidated && (
              <div className="mt-4 bg-[#D1FAE5] border-2 border-[#10B981] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#065F46] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#065F46] mb-1">Address Validated</p>
                    <p className="text-sm text-[#064E3B]">{address}</p>
                    <div className="mt-3 pt-3 border-t border-[#10B981]">
                      <p className="text-xs font-semibold text-[#065F46] mb-2">Estimated Property Value</p>
                      <p className="text-2xl font-bold text-[#065F46]">£325,000</p>
                      <p className="text-xs text-[#064E3B] mt-1">Based on recent sales in your area</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              Property Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-[#0A1628] placeholder-[#94A3B8]"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property (size, bedrooms, condition, etc.)"
            />
          </div>

          <Select
            label="Current Property Status"
            options={[
              { value: 'owned', label: 'I already own this property' },
              { value: 'under-offer', label: 'Under offer - purchase pending' },
              { value: 'searching', label: 'Still searching for property' },
              { value: 'auction', label: 'Planning to purchase at auction' }
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <div className="border-t border-[#E2E8F0] pt-6 mt-8">
            <h2 className="text-xl font-bold text-[#0A1628] mb-4">Financial Information</h2>

            <div className="space-y-6">
              <Input
                label="Monthly Income (After Tax)"
                type="number"
                prefix="£"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                helpText="Your regular monthly income from all sources"
              />

              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-3">
                  Credit Rating
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['excellent', 'good', 'fair'].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setCreditRating(rating)}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-200 text-left
                        ${creditRating === rating
                          ? 'border-[#FFB800] bg-[#FFFBF0]'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                        }
                      `}
                    >
                      <p className="font-semibold text-[#0A1628] capitalize">{rating}</p>
                      <p className="text-xs text-[#64748B] mt-1">
                        {rating === 'excellent' && '750+ credit score'}
                        {rating === 'good' && '650-749 score'}
                        {rating === 'fair' && '550-649 score'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <Select
                label="Property Investment Experience"
                options={[
                  { value: 'first-time', label: 'First time investor' },
                  { value: '1-3', label: '1-3 previous properties' },
                  { value: '4-10', label: '4-10 previous properties' },
                  { value: '10+', label: '10+ properties (experienced)' }
                ]}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                helpText="Previous experience with property investment"
              />
            </div>
          </div>

          {/* Risk Score Preview */}
          {income && creditRating && experience && (
            <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#0A1628]">Preliminary Risk Score</h3>
                <Badge variant="success">Low Risk</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Income Verification</span>
                  <span className="text-[#10B981] font-semibold">✓ Strong</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Credit Profile</span>
                  <span className="text-[#10B981] font-semibold">✓ {creditRating === 'excellent' ? 'Excellent' : 'Good'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Experience Level</span>
                  <span className="text-[#10B981] font-semibold">✓ Suitable</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" icon={<ArrowLeft />} onClick={() => navigate('/apply/1')}>
              Back
            </Button>
            <Button
              variant="primary"
              icon={<ArrowRight />}
              onClick={handleContinue}
              disabled={!address || !status || !income || !creditRating || !experience}
            >
              Continue
            </Button>
          </div>
        </form>
      </Card>
    </ApplicationLayout>
  );
};
