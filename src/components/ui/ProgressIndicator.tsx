import React from 'react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={`w-full py-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrentStep = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step bubble */}
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-[#0C4DA2] text-white' 
                      : 'bg-gray-200 text-gray-500'}
                    ${isCurrentStep ? 'ring-4 ring-blue-100' : ''}
                  `}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs ${isActive ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div 
                    className={`h-1 rounded-full ${isActive && index < currentStep ? 'bg-[#0C4DA2]' : 'bg-gray-200'}`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;