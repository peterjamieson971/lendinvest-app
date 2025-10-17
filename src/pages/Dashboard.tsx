import React from 'react';
import { Clock, ArrowRight, CheckCircle, Upload, FileText, Mail, Phone, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { UserMenu } from '../components/common/UserMenu';
import { useAuth } from '../contexts/AuthContext';

const TIMELINE_STEPS = [
  {
    title: 'Application Submitted',
    description: 'Your application was successfully submitted and approved in principle',
    status: 'complete',
    date: '14 Oct 2024'
  },
  {
    title: 'Document Verification',
    description: 'Our team is verifying your uploaded documents',
    status: 'complete',
    date: '15 Oct 2024'
  },
  {
    title: 'Legal Review',
    description: 'Solicitors are reviewing property and legal documents',
    status: 'current',
    date: 'In Progress'
  },
  {
    title: 'Property Valuation',
    description: 'Surveyor visit scheduled for property assessment',
    status: 'upcoming',
    date: null
  },
  {
    title: 'Final Underwriting',
    description: 'Final approval and offer letter to be issued',
    status: 'upcoming',
    date: null
  },
  {
    title: 'Funds Released',
    description: 'Money will be transferred to your solicitor',
    status: 'upcoming',
    date: null
  }
];

const DOCUMENTS = [
  { name: 'Passport', date: '14 Oct 2024', status: 'verified' },
  { name: 'Proof of Address', date: '14 Oct 2024', status: 'verified' },
  { name: 'Bank Statements', date: '14 Oct 2024', status: 'verified' },
  { name: 'Property Valuation', date: '14 Oct 2024', status: 'verified' },
  { name: 'Exit Strategy', date: '14 Oct 2024', status: 'verified' }
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const estimatedCompletionDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/shutterstock_2515872331.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <img
                src="https://cdn.mortgagestrategy.co.uk/content/uploads/2016/05/LendInvest-logo--768x270.gif"
                alt="LendInvest"
                className="h-10"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const fallback = document.createElement('div');
                    fallback.className = 'text-2xl font-bold text-[#FFB800]';
                    fallback.textContent = 'LendInvest';
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-[#64748B]">
            Here's the status of your bridging loan application
          </p>
        </div>

        {/* Application Status Card - Highlighted */}
        <Card highlighted className="p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFB800]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#FFB800]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-[#0A1628]">Under Review</h3>
                  <Badge variant="warning">In Progress</Badge>
                </div>
                <p className="text-[#64748B] mb-2">
                  Your application is being processed by our underwriting team
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#64748B]">Estimated completion:</span>
                  <span className="font-semibold text-[#0A1628]">3 days</span>
                </div>
              </div>
            </div>
            <Button variant="primary">
              View Application
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#64748B]">Overall Progress</span>
              <span className="font-semibold text-[#0A1628]">60%</span>
            </div>
            <div className="w-full bg-[#F8FAFC] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#FFB800] to-[#10B981] h-2 rounded-full transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </Card>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Status Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#0A1628] mb-6">Application Timeline</h2>

              <div className="space-y-6">
                {TIMELINE_STEPS.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${step.status === 'complete' ? 'bg-[#10B981] text-white' : ''}
                        ${step.status === 'current' ? 'bg-[#FFB800] text-[#0A1628] ring-4 ring-[#FFB800]/20' : ''}
                        ${step.status === 'upcoming' ? 'bg-[#F8FAFC] border-2 border-[#E2E8F0] text-[#94A3B8]' : ''}
                      `}>
                        {step.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : step.status === 'current' ? (
                          <div className="w-3 h-3 rounded-full bg-[#0A1628] animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-[#E2E8F0]" />
                        )}
                      </div>
                      {index < TIMELINE_STEPS.length - 1 && (
                        <div className={`w-0.5 h-12 my-1 ${
                          step.status === 'complete' ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
                        }`} />
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${
                          step.status === 'upcoming' ? 'text-[#94A3B8]' : 'text-[#0A1628]'
                        }`}>
                          {step.title}
                        </h3>
                        {step.date && (
                          <span className="text-sm text-[#64748B]">{step.date}</span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        step.status === 'upcoming' ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0A1628]">Documents</h2>
                <Button variant="secondary" size="sm">
                  <Upload className="w-4 h-4" />
                  Upload More
                </Button>
              </div>

              <div className="space-y-3">
                {DOCUMENTS.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#E2E8F0]">
                        <FileText className="w-5 h-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A1628] text-sm">{doc.name}</p>
                        <p className="text-xs text-[#64748B]">{doc.date}</p>
                      </div>
                    </div>
                    <Badge variant={doc.status === 'verified' ? 'success' : 'warning'}>
                      {doc.status === 'verified' ? 'Verified ✓' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">
            {/* Case Manager Card */}
            <Card className="p-6">
              <h3 className="font-bold text-[#0A1628] mb-4">Your Case Manager</h3>

              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFB800] to-[#FFC933] rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  SJ
                </div>
                <h4 className="font-bold text-[#0A1628]">Sarah Johnson</h4>
                <p className="text-sm text-[#64748B]">Senior Case Manager</p>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg transition-colors text-sm font-semibold text-[#0A1628]">
                  <Mail className="w-4 h-4" />
                  Send Message
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg transition-colors text-sm font-semibold text-[#0A1628]">
                  <Phone className="w-4 h-4" />
                  020 1234 5678
                </button>
              </div>
            </Card>

            {/* Completion Estimate */}
            <Card className="p-6 bg-gradient-to-br from-[#FFB800] to-[#FFC933] text-white">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6" />
                <h3 className="font-bold">Estimated Completion</h3>
              </div>
              <p className="text-4xl font-bold mb-2">3 Days</p>
              <p className="text-sm opacity-90">Expected: {estimatedCompletionDate}</p>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-bold text-[#0A1628] mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-[#64748B]">FAQs</span>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                </a>
                <a href="#" className="flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-[#64748B]">Contact Support</span>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                </a>
                <a href="#" className="flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-[#64748B]">Download Documents</span>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};
