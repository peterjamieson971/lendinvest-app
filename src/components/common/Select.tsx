import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  options,
  className = '',
  ...props
}) => {
  const selectClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    text-[#0A1628] bg-white
    focus:outline-none
    disabled:bg-[#F8FAFC] disabled:cursor-not-allowed
    ${error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444] focus:ring-opacity-20'
      : 'border-[#E2E8F0] focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] focus:ring-opacity-20'
    }
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#0A1628] mb-2">
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-[#EF4444]">{error}</p>
      )}
      {helpText && !error && (
        <p className="mt-2 text-sm text-[#64748B]">{helpText}</p>
      )}
    </div>
  );
};
