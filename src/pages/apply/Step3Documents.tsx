import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Shield, CheckCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLayout } from '../../components/layout/ApplicationLayout';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { FileUpload } from '../../components/common/FileUpload';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const REQUIRED_DOCS = [
  { id: 'photoId', label: 'Photo ID', description: 'Passport or Driver License' },
  { id: 'proofOfAddress', label: 'Proof of Address', description: 'Utility bill or bank statement' },
  { id: 'bankStatements', label: 'Bank Statements', description: 'Last 3 months' },
  { id: 'propertyDetails', label: 'Property Details', description: 'Valuation or offer letter' },
  { id: 'exitStrategy', label: 'Exit Strategy', description: 'Sale agreement or refinance plan' }
];

interface ExtractedDataItem {
  label: string;
  value: string;
}

interface DocumentInfo {
  label: string;
  status: string;
  confidence: number;
  extractedData: ExtractedDataItem[];
}

interface ProcessingQueueItem {
  id: number;
  fileName: string;
  status: 'processing' | 'extracting' | 'complete';
  statusText: string;
  progress: number;
}

export const Step3Documents: React.FC = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Record<string, DocumentInfo>>({});
  const [processingQueue, setProcessingQueue] = useState<ProcessingQueueItem[]>([]);

  const generateMockData = (docType: string): ExtractedDataItem[] => {
    const mockData: Record<string, ExtractedDataItem[]> = {
      photoId: [
        { label: 'Document Type', value: 'Passport' },
        { label: 'Full Name', value: 'John Smith' },
        { label: 'Date of Birth', value: '15 Mar 1985' },
        { label: 'Document Number', value: 'AB123456' },
        { label: 'Expiry Date', value: '15 Mar 2030' }
      ],
      proofOfAddress: [
        { label: 'Document Type', value: 'Utility Bill' },
        { label: 'Name', value: 'John Smith' },
        { label: 'Address', value: '123 High Street, London' },
        { label: 'Issue Date', value: '15 Jan 2025' },
        { label: 'Provider', value: 'British Gas' }
      ],
      bankStatements: [
        { label: 'Bank Name', value: 'HSBC' },
        { label: 'Account Holder', value: 'John Smith' },
        { label: 'Period', value: 'Nov 2024 - Jan 2025' },
        { label: 'Average Balance', value: '£12,450' }
      ],
      propertyDetails: [
        { label: 'Document Type', value: 'Valuation Report' },
        { label: 'Property Value', value: '£314,773' },
        { label: 'Valuation Date', value: '10 Oct 2024' },
        { label: 'Surveyor', value: 'Savills' }
      ],
      exitStrategy: [
        { label: 'Strategy Type', value: 'Refinance' },
        { label: 'Lender', value: 'Nationwide' },
        { label: 'Estimated Date', value: 'Jun 2025' },
        { label: 'Approval Status', value: 'Agreement in Principle' }
      ]
    };

    return mockData[docType] || [];
  };

  const detectDocumentType = (fileName: string): string => {
    const lower = fileName.toLowerCase();
    if (lower.includes('passport') || lower.includes('license') || lower.includes('id')) return 'photoId';
    if (lower.includes('utility') || lower.includes('bill') || lower.includes('address')) return 'proofOfAddress';
    if (lower.includes('bank') || lower.includes('statement')) return 'bankStatements';
    if (lower.includes('property') || lower.includes('valuation')) return 'propertyDetails';
    if (lower.includes('exit') || lower.includes('refinance') || lower.includes('sale')) return 'exitStrategy';

    // Default to first missing document
    const uploaded = Object.keys(documents);
    return REQUIRED_DOCS.find(d => !uploaded.includes(d.id))?.id || 'propertyDetails';
  };

  const updateQueueItem = (id: number, updates: Partial<ProcessingQueueItem>) => {
    setProcessingQueue(prev =>
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const handleFilesSelected = (files: File[]) => {
    files.forEach((file, index) => {
      const queueItem: ProcessingQueueItem = {
        id: Date.now() + index,
        fileName: file.name,
        status: 'processing',
        statusText: 'Uploading...',
        progress: 0
      };

      setProcessingQueue(prev => [...prev, queueItem]);

      // Simulate upload progress
      setTimeout(() => {
        updateQueueItem(queueItem.id, { progress: 30, statusText: 'Analyzing document...' });
      }, 500);

      setTimeout(() => {
        updateQueueItem(queueItem.id, {
          progress: 60,
          status: 'extracting',
          statusText: 'Extracting data...'
        });
      }, 1500);

      setTimeout(() => {
        updateQueueItem(queueItem.id, {
          progress: 90,
          statusText: 'Verifying authenticity...'
        });
      }, 2500);

      setTimeout(() => {
        // Determine document type and extract mock data
        const docType = detectDocumentType(file.name);
        const extractedData = generateMockData(docType);

        setDocuments(prev => ({
          ...prev,
          [docType]: {
            label: REQUIRED_DOCS.find(d => d.id === docType)?.label || '',
            status: 'verified',
            confidence: Math.floor(Math.random() * (99 - 94) + 94),
            extractedData
          }
        }));

        updateQueueItem(queueItem.id, {
          progress: 100,
          status: 'complete',
          statusText: 'Complete'
        });

        // Remove from queue after 1 second
        setTimeout(() => {
          setProcessingQueue(prev => prev.filter(item => item.id !== queueItem.id));
        }, 1000);
      }, 3500);
    });
  };

  const allDocumentsVerified = useMemo(() => {
    return REQUIRED_DOCS.every(
      doc => documents[doc.id]?.status === 'verified'
    );
  }, [documents]);

  return (
    <ApplicationLayout currentStep={3}>
      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
              Upload your documents
            </h1>
            <p className="text-[#64748B]">
              Our AI will verify and extract data instantly. All documents are encrypted and secure.
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <span>All uploads are encrypted with bank-grade security</span>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-[#F8FAFC] rounded-lg p-6">
            <h3 className="font-semibold text-[#0A1628] mb-4">Required Documents</h3>
            <div className="space-y-3">
              {REQUIRED_DOCS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {documents[doc.id]?.status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#E2E8F0]" />
                    )}
                    <div>
                      <p className="font-medium text-[#0A1628]">{doc.label}</p>
                      <p className="text-sm text-[#64748B]">{doc.description}</p>
                    </div>
                  </div>
                  {documents[doc.id]?.status === 'verified' && (
                    <Badge variant="success">Verified ✓</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-3">
              Upload Documents
            </label>

            <FileUpload
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onFilesSelected={handleFilesSelected}
            />
          </div>

          {/* Processing Queue */}
          {processingQueue.length > 0 && (
            <div className="space-y-4">
              {processingQueue.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {item.status === 'processing' && <LoadingSpinner size="sm" />}
                      {item.status === 'extracting' && <LoadingSpinner size="sm" />}
                      {item.status === 'complete' && (
                        <CheckCircle className="w-8 h-8 text-[#10B981]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-[#0A1628]">{item.fileName}</p>
                        <span className="text-sm text-[#64748B]">{item.statusText}</span>
                      </div>
                      <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                        <div
                          className="bg-[#FFB800] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Verified Documents */}
          {Object.values(documents).filter(d => d.status === 'verified').length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#0A1628]">Verified Documents</h3>
              {Object.entries(documents).map(([docType, doc]) => {
                if (doc.status !== 'verified') return null;

                return (
                  <Card key={docType} highlighted className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#10B981]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-[#0A1628]">{doc.label}</h4>
                          <Badge variant="success">Verified ✓</Badge>
                        </div>

                        {/* Extracted Data */}
                        <div className="bg-white rounded-lg p-4 mb-3">
                          <p className="text-sm font-semibold text-[#64748B] mb-2">Extracted Information:</p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            {doc.extractedData.map((item, idx) => (
                              <div key={idx}>
                                <span className="text-[#64748B]">{item.label}:</span>
                                <span className="ml-2 font-semibold text-[#0A1628]">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Verification Checks */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="success">Document Valid ✓</Badge>
                          <Badge variant="success">Data Extracted ✓</Badge>
                          <Badge variant="success">No Fraud Detected ✓</Badge>
                          <Badge variant="info">Confidence: {doc.confidence}%</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
            <Button variant="ghost" onClick={() => navigate('/apply/step2')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/apply/step4')}
              disabled={!allDocumentsVerified}
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
