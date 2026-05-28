'use client'

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "../module/product.type";

interface Props {
    isOpen: boolean;
    onClose?: () => void;
    data: ProductType;
}

export const ReviewsUi: React.FC<Props> = ({ isOpen, onClose, data }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Затемнение */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-9999"
                        onClick={handleClose}
                    />

                    {/* Панель отзывов */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed right-4 top-4 bottom-4 max-w-200 w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-9999"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-black/20">
                            <h2 className="text-2xl font-bold text-[#191C1F]">Отзывы</h2>
                            <button
                                onClick={handleClose}
                                className="p-1 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full transition-colors duration-300"
                            >
                                <X size={24} className="" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-6">
                                {/* Здесь будут отзывы */}
                                <p className="text-gray-500">Нет отзывов</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

    )
}