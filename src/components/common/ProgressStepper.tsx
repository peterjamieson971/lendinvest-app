import React from 'react';

interface Step {
  label: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step */}
              <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                  transition-all duration-300
                  ${isCompleted ? 'bg-[#FFB800] text-[#0A1628] shadow-sm' : ''}
                  ${isCurrent ? 'bg-[#FFB800] text-[#0A1628] ring-4 ring-[#FFB800] ring-opacity-20 shadow-md' : ''}
                  ${isUpcoming ? 'bg-[#F8FAFC] text-[#94A3B8] border-2 border-[#E2E8F0]' : ''}
                `}>
                  {isCompleted ? <CheckIcon /> : stepNumber}
                </div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-semibold ${isCurrent || isCompleted ? 'text-[#0A1628]' : 'text-[#94A3B8]'}`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-[#64748B] mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2 -mt-12 max-w-[100px]
                  transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-[#FFB800]' : 'bg-[#E2E8F0]'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
