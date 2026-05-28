'use client'

import { useEffect, useState } from "react";
import { CartType } from "../module/cart.type"
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { RdyModal, useModal } from "rdy-comp";
import { Checkbox } from "@/components/Checkbox";

interface Props {
    data: CartType;
    index: number;
    isChecked: boolean,
    onToggle: (id: number) => void;
}

export const CartItemUi: React.FC<Props> = ({ data, index, isChecked, onToggle }) => {
    const [value, setValue] = useState(data.count);
    const [totalCost, setTotalCost] = useState(data.cost * data.count);
    const { openModal, closeModal } = useModal()

    useEffect(() => {
        setTotalCost(data.cost * value);
    }, [value, data.cost])

    const handleValue = (operation: number) => {
        const newValue = value + operation;
        if (newValue >= 1) { // Не даем уйти в 0 или ниже
            setValue(newValue);
        }
    }

    return (
        <>
            <motion.li
                variants={{
                    hidden: { opacity: 0, x: -50, scale: 0.9 },
                    visible: (index: number) => ({
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 200,
                            delay: index * 0.1
                        }
                    }),
                    exit: {
                        opacity: 0,
                        x: 50,
                        scale: 0.9,
                        transition: { duration: 0.2 }
                    }
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: .3 }}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-6 flex border border-[#E0E2E6] rounded-xl justify-between items-center gap-4 shadow"
            >
                <div>
                    <Checkbox
                        checked={isChecked}
                        onChange={() => onToggle(data.id)}
                    />
                </div>
                <div className="flex gap-6 flex-1">
                    <img src={data.image} alt="" className="max-w-30 max-h-30 w-full h-auto rounded-lg" />
                    <div className="py-3 flex flex-col w-full">
                        <h3 className="text-2xl mb-1 font-semibold">{data.name}</h3>
                        <p className="text-[16px] text-[#3C4A42] mb-3 w-full max-w-70 truncate">{data.description}</p>
                        <span className="text-[16px] text-[#006C49] font-semibold">{totalCost} ₽</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center border border-gray-400 rounded-xl">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.90 }}
                                onClick={() => handleValue(-1)}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                            >
                                <Minus size={14} />
                            </motion.button>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(Math.max(1, Number(e.target.value)))}
                                className="w-12 text-center text-sm text-gray-700 border-r border-l border-gray-300 py-1 focus:outline-none focus:border-[#006C49]"
                            />
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.90 }}
                                onClick={() => handleValue(1)}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#006C49] transition-colors"
                            >
                                <Plus size={14} />
                            </motion.button>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[#6C7A71] hover:text-red-400 p-3 hover:bg-red-100 rounded-full transition-colors duration-300"
                        onClick={() => openModal(String(data.id))}
                    >
                        <Trash2 />
                    </motion.button>
                </div>
            </motion.li>
            <RdyModal id={String(data.id)} title="" className="">
                Вы уверены что хотите удалить товар: {data.name}
            </RdyModal>
        </>
    )
}