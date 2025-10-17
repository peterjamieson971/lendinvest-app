import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#0A1628] mb-3">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${value === option.value
                ? 'border-[#FFB800] bg-[#FFFBF0]'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
              }
            `}
          >
            <input
              type="radio"
              className="mt-1 w-4 h-4 text-[#FFB800] focus:ring-[#FFB800] focus:ring-offset-0"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <div className="ml-3 flex-1">
              <div className="font-semibold text-[#0A1628]">{option.label}</div>
              {option.description && (
                <div className="text-sm text-[#64748B] mt-1">{option.description}</div>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
};
