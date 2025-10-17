import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Select } from '../components/common/Select';
import { RadioGroup } from '../components/common/RadioGroup';
import { FileUpload } from '../components/common/FileUpload';
import { Modal } from '../components/common/Modal';
import { Upload, Mail, Search } from 'lucide-react';

export const ComponentTest: React.FC = () => {
  const [radioValue, setRadioValue] = useState('option1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#0A1628] mb-2">Component Test Page</h1>
          <p className="text-lg text-[#64748B]">Verify all components match the design system exactly</p>
        </div>

        {/* BUTTONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Buttons</h2>
          <Card className="p-8">
            <div className="space-y-8">
              {/* Primary Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-[#0A1628] mb-4">Primary Variant</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="lg">Large Primary</Button>
                  <Button variant="primary" size="md">Medium Primary</Button>
                  <Button variant="primary" size="sm">Small Primary</Button>
                  <Button variant="primary" size="md" icon={<Upload />}>With Icon</Button>
                  <Button variant="primary" size="md" loading>Loading</Button>
                  <Button variant="primary" size="md" disabled>Disabled</Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-[#0A1628] mb-4">Secondary Variant</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">Large Secondary</Button>
                  <Button variant="secondary" size="md">Medium Secondary</Button>
                  <Button variant="secondary" size="sm">Small Secondary</Button>
                  <Button variant="secondary" size="md" icon={<Mail />}>With Icon</Button>
                </div>
              </div>

              {/* Ghost Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-[#0A1628] mb-4">Ghost Variant</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" size="md">Ghost Button</Button>
                  <Button variant="ghost" size="sm">Small Ghost</Button>
                </div>
              </div>

              {/* Hover Test */}
              <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Hover Test</p>
                <p className="text-xs text-[#64748B]">Hover over buttons to verify:</p>
                <ul className="text-xs text-[#64748B] mt-2 space-y-1">
                  <li>• Primary: bg-[#FFCA33], shadow-md, -translate-y-0.5</li>
                  <li>• Secondary: bg-[#F8FAFC], border-[#CBD5E1]</li>
                  <li>• Ghost: bg-[#F8FAFC]</li>
                  <li>• All: transition-all duration-200</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* INPUTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Inputs</h2>
          <Card className="p-8">
            <div className="space-y-6 max-w-2xl">
              <Input
                label="Normal Input"
                placeholder="Type here..."
                helpText="This is help text"
              />

              <Input
                label="With Prefix"
                prefix="£"
                placeholder="300,000"
                helpText="Currency input with prefix"
              />

              <Input
                label="With Icon"
                icon={<Search className="w-5 h-5" />}
                placeholder="Search..."
              />

              <Input
                label="Error State"
                error="This field is required"
                value="Invalid value"
              />

              <Input
                label="Disabled State"
                disabled
                value="Cannot edit this field"
              />

              <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Focus Test</p>
                <p className="text-xs text-[#64748B]">Click/Tab into inputs to verify:</p>
                <ul className="text-xs text-[#64748B] mt-2 space-y-1">
                  <li>• border-[#FFB800] on focus</li>
                  <li>• ring-2 ring-[#FFB800] ring-opacity-20</li>
                  <li>• Error state: border-[#EF4444] & red ring</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* CARDS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Normal Card</h3>
              <p className="text-[#64748B]">Standard card styling with border-[#E2E8F0]</p>
            </Card>

            <Card hover className="p-6">
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Hover Card</h3>
              <p className="text-[#64748B]">Hover over me to see shadow-md and -translate-y-0.5!</p>
            </Card>

            <Card highlighted className="p-6">
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Highlighted</h3>
              <p className="text-[#64748B]">border-[#FFB800] bg-[#FFFBF0]</p>
            </Card>
          </div>
        </section>

        {/* PROGRESS STEPPER */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Progress Stepper</h2>
          <Card className="p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#0A1628] mb-2">Step 3 of 5 (Current)</p>
            </div>
            <ProgressStepper
              steps={[
                { label: 'Eligibility', description: 'Quick check' },
                { label: 'Details', description: 'Property info' },
                { label: 'Documents', description: 'Upload files' },
                { label: 'Banking', description: 'Verify income' },
                { label: 'Decision', description: 'Get approved' },
              ]}
              currentStep={3}
            />
            <div className="mt-6 bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Verify</p>
              <ul className="text-xs text-[#64748B] space-y-1">
                <li>• Steps 1-2: bg-[#FFB800] with checkmark</li>
                <li>• Step 3: bg-[#FFB800] with ring-4 ring-opacity-20</li>
                <li>• Steps 4-5: bg-[#F8FAFC] border-[#E2E8F0]</li>
                <li>• Connectors: bg-[#FFB800] when complete</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* BADGES */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Badges</h2>
          <Card className="p-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#0A1628] mb-3">All Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">✓ Success</Badge>
                  <Badge variant="warning">⚠ Warning</Badge>
                  <Badge variant="error">✕ Error</Badge>
                  <Badge variant="info">ℹ Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </div>
              </div>

              <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Color Check</p>
                <ul className="text-xs text-[#64748B] space-y-1">
                  <li>• Success: bg-[#D1FAE5] text-[#065F46]</li>
                  <li>• Warning: bg-[#FEF3C7] text-[#92400E]</li>
                  <li>• Error: bg-[#FEE2E2] text-[#991B1B]</li>
                  <li>• Info: bg-[#DBEAFE] text-[#1E40AF]</li>
                  <li>• Neutral: bg-[#F1F5F9] text-[#475569]</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* LOADING SPINNER */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Loading Spinner</h2>
          <Card className="p-8">
            <div className="flex items-center gap-12">
              <div className="text-center">
                <LoadingSpinner size="sm" />
                <p className="text-xs text-[#64748B] mt-2">Small</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="md" />
                <p className="text-xs text-[#64748B] mt-2">Medium</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="text-xs text-[#64748B] mt-2">Large</p>
              </div>
            </div>
          </Card>
        </section>

        {/* SELECT */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Select Dropdown</h2>
          <Card className="p-8">
            <div className="max-w-md space-y-6">
              <Select
                label="Normal Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                helpText="Choose an option from the dropdown"
              />

              <Select
                label="Error State"
                options={[
                  { value: 'option1', label: 'Option 1' },
                ]}
                error="Please select a valid option"
              />
            </div>
          </Card>
        </section>

        {/* RADIO GROUP */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Radio Group</h2>
          <Card className="p-8">
            <div className="max-w-2xl">
              <RadioGroup
                label="Property Type"
                options={[
                  { value: 'option1', label: 'Residential', description: 'Houses, flats, or apartments' },
                  { value: 'option2', label: 'Commercial', description: 'Shops, offices, or warehouses' },
                  { value: 'option3', label: 'Semi-Commercial', description: 'Mixed use properties' },
                ]}
                value={radioValue}
                onChange={setRadioValue}
              />
              <div className="mt-6 bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Selected: {radioValue}</p>
                <p className="text-xs text-[#64748B]">Selected should have border-[#FFB800] bg-[#FFFBF0]</p>
              </div>
            </div>
          </Card>
        </section>

        {/* FILE UPLOAD */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">File Upload</h2>
          <Card className="p-8">
            <div className="max-w-2xl">
              <FileUpload
                label="Document Upload"
                accept=".pdf,.jpg,.png"
                multiple
                onFilesSelected={(files) => console.log('Files:', files)}
              />
              <div className="mt-6 bg-[#FFFBF0] border-2 border-[#FFB800] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0A1628] mb-2">✓ Interaction Test</p>
                <p className="text-xs text-[#64748B]">Hover or drag files to see border-[#FFB800] bg-[#FFFBF0]</p>
              </div>
            </div>
          </Card>
        </section>

        {/* MODAL */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Modal</h2>
          <Card className="p-8">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Test Modal"
              size="md"
            >
              <p className="text-[#64748B] mb-4">
                This is a modal dialog. It should have a backdrop with bg-black bg-opacity-50.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-[#64748B]">✓ White background with rounded-2xl</p>
                <p className="text-sm text-[#64748B]">✓ Close button in top-right</p>
                <p className="text-sm text-[#64748B]">✓ Click backdrop to close</p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </Card>
        </section>

        {/* COLOR PALETTE */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Color Palette Verification</h2>
          <Card className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="w-full h-24 bg-[#FFB800] rounded-lg mb-2"></div>
                <p className="text-xs font-semibold text-[#0A1628]">#FFB800</p>
                <p className="text-xs text-[#64748B]">Brand Yellow</p>
              </div>
              <div>
                <div className="w-full h-24 bg-[#0A1628] rounded-lg mb-2"></div>
                <p className="text-xs font-semibold text-[#0A1628]">#0A1628</p>
                <p className="text-xs text-[#64748B]">Brand Navy</p>
              </div>
              <div>
                <div className="w-full h-24 bg-[#475569] rounded-lg mb-2"></div>
                <p className="text-xs font-semibold text-[#0A1628]">#475569</p>
                <p className="text-xs text-[#64748B]">Brand Slate</p>
              </div>
              <div>
                <div className="w-full h-24 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg mb-2"></div>
                <p className="text-xs font-semibold text-[#0A1628]">#F8FAFC</p>
                <p className="text-xs text-[#64748B]">Background</p>
              </div>
            </div>
          </Card>
        </section>

        {/* TYPOGRAPHY */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Typography Scale</h2>
          <Card className="p-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-bold text-[#0A1628]">H1 - 48px Bold</h1>
                <p className="text-xs text-[#64748B]">text-5xl font-bold text-[#0A1628]</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#0A1628]">H2 - 36px Bold</h2>
                <p className="text-xs text-[#64748B]">text-4xl font-bold text-[#0A1628]</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A1628]">H3 - 24px Bold</h3>
                <p className="text-xs text-[#64748B]">text-2xl font-bold text-[#0A1628]</p>
              </div>
              <div>
                <p className="text-base text-[#0A1628]">Body - 16px Regular</p>
                <p className="text-xs text-[#64748B]">text-base text-[#0A1628]</p>
              </div>
              <div>
                <p className="text-base text-[#64748B]">Body Secondary - 16px Regular</p>
                <p className="text-xs text-[#64748B]">text-base text-[#64748B]</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Small - 14px Regular</p>
                <p className="text-xs text-[#64748B]">text-sm text-[#64748B]</p>
              </div>
            </div>
          </Card>
        </section>

        {/* SPACING SYSTEM */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Spacing System (8px base)</h2>
          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-[#FFB800]"></div>
                <p className="text-sm text-[#64748B]">2 (8px) - Related items</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-8 bg-[#FFB800]"></div>
                <p className="text-sm text-[#64748B]">4 (16px) - Form fields</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-8 bg-[#FFB800]"></div>
                <p className="text-sm text-[#64748B]">6 (24px) - Section spacing</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#FFB800]"></div>
                <p className="text-sm text-[#64748B]">8 (32px) - Card padding</p>
              </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
};
