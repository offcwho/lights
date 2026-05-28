'use client'

import Container from "@/components/Container"
import { CartItem } from ".."
import { Button } from "@/components/Button"
import { useEffect, useState } from "react"
import { CartData } from "../module/cart.data"
import { CartType } from "../module/cart.type"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Checkbox } from "@/components/Checkbox"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const headerVariants: Variants = {
    hidden: { opacity: 0, x: -50, y: -20 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 200,
            duration: 0.6
        }
    }
};

const sidebarVariants: Variants = {
    hidden: { opacity: 0, x: 100, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 150,
            duration: 0.6,
            delay: 0.2
        }
    }
};

export const CartUi = () => {
    const [data, setData] = useState<CartType[]>([]);
    const [cartValue, setCartValue] = useState(0);
    const [count, setCount] = useState(0);
    const [select, setSelect] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        const initialData = CartData.map(item => ({
            ...item,
            checked: false
        }));
        setData(initialData);
    }, []);

    useEffect(() => {
        let total = 0;
        let totalCount = 0;

        data?.forEach(item => {
            if (item.checked) {
                total += Number(item.cost) * Number(item.count);
                totalCount += Number(item.count);
            }
        });

        setCount(totalCount);
        setCartValue(total);
    }, [data, selectedIds]);

    const handleToggle = (id: number) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );

        setSelectedIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(selectedId => selectedId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    };

    const handleSelectAll = () => {
        const newCheckedState = !select;
        setSelect(newCheckedState);
        
        setData(prevData =>
            prevData.map(item => ({
                ...item,
                checked: newCheckedState
            }))
        );
        
        if (newCheckedState) {
            const allIds = data.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleRemoveSelected = () => {
        const newData = data.filter(item => !selectedIds.includes(item.id));
        setData(newData);
        setSelectedIds([]);
        setSelect(false);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-12"
        >
            <Container>
                <motion.h1
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-12 font-bold text-[#191C1F]"
                >
                    Ваша корзина
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8">
                    <div className="col-span-1 md:col-span-4">
                        <div className="py-3 sm:py-4 px-3 sm:px-5 mb-3 border border-[#E0E2E6] shadow rounded-xl flex flex-col sm:flex-row sm:justify-between gap-3">
                            <div className="flex gap-3">
                                <Checkbox
                                    label="Выбрать все"
                                    checked={select}
                                    onChange={handleSelectAll}
                                />
                            </div>
                            <AnimatePresence>
                                {selectedIds.length > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: .3 }}
                                        onClick={handleRemoveSelected}
                                        className="flex items-center gap-2 text-gray-700 hover:text-red-400 transition-colors duration-300"
                                    >
                                        <span className="text-sm">Удалить выбранное</span>
                                        <Trash2 size={14} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {data?.map((item, index) => (
                                    <CartItem
                                        data={item}
                                        key={item.id}
                                        index={index}
                                        isChecked={item.checked}
                                        onToggle={handleToggle}
                                    />
                                ))}
                            </AnimatePresence>

                            {(!data || data.length === 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12 bg-gray-50 rounded-xl"
                                >
                                    <p className="text-gray-500">Корзина пуста</p>
                                </motion.div>
                            )}
                        </motion.ul>
                    </div>
                    <motion.div
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        className="col-span-1 md:col-span-2 "
                    >
                        <motion.div
                            className="rounded-xl bg-[#F2F4F8] p-4 sm:p-6 md:p-8 h-fit sticky top-0"
                            whileHover={{
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#191C1F]">
                                Итого
                            </motion.h3>
                            <motion.ul className="text-[#3C4A42] flex flex-col gap-2 py-3 sm:py-4 border-b border-[#E0E2E6]">
                                <motion.li className="flex justify-between text-xs sm:text-sm md:text-base">
                                    <span>Товары ({count || 0})</span>
                                    <motion.span>
                                        {cartValue} ₽
                                    </motion.span>
                                </motion.li>
                                <motion.li className="flex justify-between text-xs sm:text-sm md:text-base">
                                    <span>Скидка</span>
                                    <span className="text-[#006C49]">- 0 ₽</span>
                                </motion.li>
                                <motion.li className="flex justify-between text-xs sm:text-sm md:text-base">
                                    <span>Доставка</span>
                                    <span>Бесплатно</span>
                                </motion.li>
                            </motion.ul>
                            <motion.div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mt-3 sm:mt-4 md:mt-4">
                                <h5>К оплате</h5>
                                <span className="text-[#006C49]">{cartValue} ₽</span>
                            </motion.div>
                            <Button.primary className="mt-8 w-full" delay={0.3}>
                                Перейти к оформлению
                            </Button.primary>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </motion.section>
    )
}