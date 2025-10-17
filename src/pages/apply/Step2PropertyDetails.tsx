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

  const [houseNumber, setHouseNumber] = useState('');
  const [postcode, setPostcode] = useState('');
  const [showValuation, setShowValuation] = useState(false);
  const [isLoadingValuation, setIsLoadingValuation] = useState(false);
  const [mockValuation, setMockValuation] = useState(0);
  const [ownership, setOwnership] = useState('');
  const [description, setDescription] = useState('');

  // Property details state - populated after valuation
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [garages, setGarages] = useState('');
  const [livingRooms, setLivingRooms] = useState('');

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

  // Resolve address when house number and postcode are entered
  const resolveAddress = () => {
    if (houseNumber === '4' && postcode.toUpperCase() === 'ML6 9HU') {
      return '4 Brennan Crescent, Airdrie, North Lanarkshire, ML6 9HU';
    }
    return `${houseNumber}, ${postcode}`;
  };

  const handleGetValuation = () => {
    const addr = resolveAddress();
    setIsLoadingValuation(true);
    setShowValuation(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * (320000 - 280000) + 280000);
      setMockValuation(val);

      // Auto-generate property description based on address
      const autoDescription = generatePropertyDescription(addr, val);
      setDescription(autoDescription);

      // Populate property details after valuation
      setBedrooms('5');
      setBathrooms('3');
      setGarages('2');
      setLivingRooms('2');

      setIsLoadingValuation(false);
    }, 2000);
  };


  // Form validation
  const isValid = useMemo(() => {
    return !!(
      houseNumber &&
      postcode &&
      ownership &&
      description &&
      bedrooms &&
      bathrooms &&
      garages &&
      livingRooms
    );
  }, [houseNumber, postcode, ownership, description, bedrooms, bathrooms, garages, livingRooms]);

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

          {/* Property Address - Two fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="House Name or Number"
              type="text"
              placeholder="e.g. 4"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <Input
              label="Postcode"
              type="text"
              placeholder="e.g. ML6 9HU"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            />
          </div>

          {/* Show resolved address */}
          {houseNumber && postcode && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
              <p className="text-sm text-[#64748B] mb-1">Resolved Address:</p>
              <p className="font-semibold text-[#0A1628]">{resolveAddress()}</p>
            </div>
          )}

          {/* Mock Valuation Feature */}
          {houseNumber && postcode && !showValuation && (
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

          {/* Ownership Status */}
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

          {/* Property Details Section - only show after valuation */}
          {showValuation && !isLoadingValuation && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-1">Property Details</h3>
                <p className="text-sm text-[#64748B]">Pre-populated from our database - please verify</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  label="Bedrooms"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
                <Input
                  label="Garages"
                  type="number"
                  value={garages}
                  onChange={(e) => setGarages(e.target.value)}
                />
                <Input
                  label="Living Rooms"
                  type="number"
                  value={livingRooms}
                  onChange={(e) => setLivingRooms(e.target.value)}
                />
              </div>
            </div>
          )}

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
