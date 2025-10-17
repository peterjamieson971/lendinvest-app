import React, { useState } from 'react';
import { ApplicationLayout } from '../components/layout/ApplicationLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { FileUpload } from '../components/common/FileUpload';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowRight, ArrowLeft, Upload, FileText, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UploadedFile {
  name: string;
  type: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  extractedData?: {
    documentType?: string;
    confidence?: number;
    fraudCheck?: string;
  };
}

export const Step3Documents: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFilesSelected = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      name: file.name,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file, index) => {
      // Upload simulation
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 20;
        setUploadedFiles(prev => prev.map(f =>
          f.name === file.name ? { ...f, progress } : f
        ));

        if (progress >= 100) {
          clearInterval(uploadInterval);
          // Start processing
          setTimeout(() => {
            setUploadedFiles(prev => prev.map(f =>
              f.name === file.name ? { ...f, status: 'processing' } : f
            ));

            // Complete processing
            setTimeout(() => {
              setUploadedFiles(prev => prev.map(f =>
                f.name === file.name
                  ? {
                      ...f,
                      status: 'complete',
                      extractedData: {
                        documentType: file.name.includes('passport') ? 'ID - Passport' :
                                      file.name.includes('license') ? 'ID - Driver License' :
                                      file.name.includes('bank') ? 'Bank Statement' :
                                      'Property Document',
                        confidence: 95 + Math.random() * 5,
                        fraudCheck: 'Passed'
                      }
                    }
                  : f
              ));
            }, 2500);
          }, 500);
        }
      }, 200);
    });
  };

  const allDocumentsProcessed = uploadedFiles.length >= 3 &&
    uploadedFiles.every(f => f.status === 'complete');

  const handleContinue = () => {
    navigate('/apply/4');
  };

  const documentRequirements = [
    { label: 'Photo ID', description: 'Passport or Driver License', uploaded: uploadedFiles.some(f => f.extractedData?.documentType?.includes('ID')) },
    { label: 'Proof of Address', description: 'Utility bill or bank statement', uploaded: uploadedFiles.some(f => f.extractedData?.documentType?.includes('Statement')) },
    { label: 'Property Details', description: 'Property valuation or purchase agreement', uploaded: uploadedFiles.some(f => f.extractedData?.documentType?.includes('Property')) }
  ];

  return (
    <ApplicationLayout currentStep={3}>
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
          Document Upload
        </h1>
        <p className="text-[#64748B] mb-8">
          Upload your documents for instant AI verification. All documents are encrypted and secure.
        </p>

        {/* Document Requirements Checklist */}
        <div className="mb-8 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-6">
          <h3 className="text-lg font-bold text-[#0A1628] mb-4">Required Documents</h3>
          <div className="space-y-3">
            {documentRequirements.map((req, index) => (
              <div key={index} className="flex items-start gap-3">
                {req.uploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                ) : (
                  <div className="w-5 h-5 border-2 border-[#E2E8F0] rounded-full mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-[#0A1628]">{req.label}</p>
                  <p className="text-sm text-[#64748B]">{req.description}</p>
                </div>
                {req.uploaded && <Badge variant="success">Uploaded</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Area */}
        <FileUpload
          label="Upload Documents"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onFilesSelected={handleFilesSelected}
        />

        {/* Security Notice */}
        <div className="mt-4 flex items-start gap-2 text-sm text-[#64748B]">
          <Shield className="w-4 h-4 mt-0.5" />
          <p>All uploads are encrypted with bank-grade security. Your documents are safe with us.</p>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold text-[#0A1628]">Uploaded Documents</h3>
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                    ${file.status === 'complete' ? 'bg-[#D1FAE5]' : 'bg-[#F8FAFC]'}
                  `}>
                    {file.status === 'complete' ? (
                      <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                    ) : file.status === 'processing' ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <FileText className="w-6 h-6 text-[#94A3B8]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0A1628] truncate">{file.name}</p>
                        <p className="text-sm text-[#64748B]">
                          {file.status === 'uploading' && `Uploading... ${file.progress}%`}
                          {file.status === 'processing' && 'AI analyzing document...'}
                          {file.status === 'complete' && file.extractedData?.documentType}
                        </p>
                      </div>
                      {file.status === 'complete' && (
                        <Badge variant="success">Verified</Badge>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-3 w-full bg-[#E2E8F0] rounded-full h-2">
                        <div
                          className="bg-[#FFB800] h-2 rounded-full transition-all duration-200"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}

                    {/* Processing Animation */}
                    {file.status === 'processing' && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <div className="animate-pulse">🔍</div>
                          <span>Extracting document data...</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <div className="animate-pulse">🛡️</div>
                          <span>Running fraud checks...</span>
                        </div>
                      </div>
                    )}

                    {/* Extracted Data */}
                    {file.status === 'complete' && file.extractedData && (
                      <div className="mt-3 p-3 bg-[#F8FAFC] rounded-lg">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[#64748B] mb-1">Document Type</p>
                            <p className="font-semibold text-[#0A1628]">{file.extractedData.documentType}</p>
                          </div>
                          <div>
                            <p className="text-[#64748B] mb-1">Confidence Score</p>
                            <p className="font-semibold text-[#10B981]">{file.extractedData.confidence?.toFixed(1)}%</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                          <span className="text-xs text-[#64748B]">Fraud Check</span>
                          <div className="flex items-center gap-1 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                            <span className="font-semibold text-[#10B981]">{file.extractedData.fraudCheck}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Documents */}
        <div className="mt-8 bg-[#DBEAFE] border-2 border-[#3B82F6] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#1E40AF] mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-[#1E40AF] mb-1">Additional Documents (Optional)</p>
              <p className="text-[#1E3A8A]">
                You can upload additional documents like exit strategy plans, development plans, or property surveys to strengthen your application.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-[#E2E8F0] mt-8">
          <Button variant="ghost" icon={<ArrowLeft />} onClick={() => navigate('/apply/2')}>
            Back
          </Button>
          <Button
            variant="primary"
            icon={<ArrowRight />}
            onClick={handleContinue}
            disabled={!allDocumentsProcessed}
          >
            Continue to Banking
          </Button>
        </div>
      </Card>
    </ApplicationLayout>
  );
};
