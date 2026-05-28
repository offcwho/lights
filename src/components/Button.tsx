'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
    className?: string;
    children: React.ReactNode;
    delay?: number
}

export const ButtonContainer: React.FC<Props> = ({ children, className, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (delay === 0) setIsVisible(true)
        if (delay) {
            const timer = setTimeout(() => setIsVisible(true), delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [delay]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.2,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ opacity: 0 }}
                    className={`px-8 py-4 rounded-xl ${className}`}
                >
                    {children}
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export const Button = {
    primary: ({ children, className, delay }: Props) => (
        <ButtonContainer
            delay={delay}
            className={`bg-[#006C49] text-white border border-[#006C49] ${className}`}
        >
            {children}
        </ButtonContainer>
    ),
    secondary: ({ children, className, delay }: Props) => (
        <ButtonContainer
            delay={delay}
            className={`bg-white text-[#006C49] border border-white ${className}`}
        >
            {children}
        </ButtonContainer>
    ),
    ghost: ({ children, className, delay }: Props) => (
        <ButtonContainer
            delay={delay}
            className={`text-[#191C1F] border border-[#191C1F] bg-white/10 backdrop-blur-md ${className}`}
        >
            {children}
        </ButtonContainer>
    ),
};