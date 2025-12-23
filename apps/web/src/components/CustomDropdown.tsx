"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface CustomDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleziona...",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options.find((opt) => opt.value === "all");

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors min-w-[160px] justify-between"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption?.icon && (
            <selectedOption.icon className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === value || (value === undefined && option.value === "all");
            
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors ${
                  isSelected
                    ? "bg-zinc-100 dark:bg-zinc-700 font-medium"
                    : ""
                }`}
              >
                {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                <span className="flex-1">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

