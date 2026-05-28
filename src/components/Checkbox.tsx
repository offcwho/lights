'use client'

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export const Checkbox = ({
    checked,
    onChange,
    label,
    disabled = false,
    className = ''
}: CheckboxProps) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <motion.button
                type="button"
                onClick={() => !disabled && onChange(!checked)}
                className={`
                    relative w-5 h-5 rounded border-2 flex items-center justify-center
                    transition-colors duration-200
                    ${checked ? 'bg-[#006C49] border-[#006C49]' : 'bg-white border-gray-300'}
                    ${!disabled && 'hover:border-[#006C49]'}
                `}
                whileTap={{ scale: 0.9 }}
                disabled={disabled}
            >
                <motion.div
                    initial={false}
                    animate={checked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    <Check size={12} className="text-white" />
                </motion.div>
            </motion.button>
            {label && (
                <span className="text-sm text-gray-700 select-none">
                    {label}
                </span>
            )}
        </label>
    );
};