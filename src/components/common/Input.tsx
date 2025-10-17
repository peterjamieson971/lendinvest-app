import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  prefix?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  icon,
  prefix,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    text-[#0A1628] placeholder-[#94A3B8]
    focus:outline-none
    disabled:bg-[#F8FAFC] disabled:cursor-not-allowed
    ${error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444] focus:ring-opacity-20'
      : 'border-[#E2E8F0] focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] focus:ring-opacity-20'
    }
    ${icon ? 'pl-11' : ''}
    ${prefix ? 'pl-8' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#0A1628] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
            {icon}
          </div>
        )}
        {prefix && (
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#64748B] font-medium">
            {prefix}
          </span>
        )}
        <input
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#EF4444] flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-2 text-sm text-[#64748B]">{helpText}</p>
      )}
    </div>
  );
};
