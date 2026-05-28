'use client'

import { Button } from "@/components/Button";
import { Heart, ShoppingCart, Star, } from "lucide-react";
import { data } from "../module/product.data";
import { ProductSlider, Reviews } from "..";
import { useState } from "react";
import { motion, Variants } from "framer-motion";

interface Props {
    slug: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const calculateAverageRating = (reviews: { rating: number }[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;
    return Math.round(average);
};

export const ProductUi: React.FC<Props> = ({ slug }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false)
    }

    const averageRating = calculateAverageRating(data.reviews);
    const emptyStars = 5 - averageRating;

    return (
        <div className="">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-20"
            >
                {/* Левая колонка - изображение */}
                <ProductSlider data={data} />

                {/* Правая колонка - контент */}
                <motion.div variants={containerVariants} className="">
                    {/* Tag и рейтинг */}
                    <motion.div variants={itemVariants} className="flex gap-3 items-center">
                        <motion.div
                            variants={itemVariants}
                            className="px-3 py-1 bg-[#006C49]/10 text-[#006C49] rounded-full text-sm"
                        >
                            {data.tag || "New"}
                        </motion.div>
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            onClick={() => setIsOpen(true)}
                            className="flex gap-2 cursor-pointer group"
                        >
                            <div className="flex gap-1" >
                                {[...Array(averageRating)].map((_, i) => (
                                    <Star key={i} fill="#006C49" stroke="#006C49" size={20} />
                                ))}
                                {[...Array(emptyStars)].map((_, i) => (
                                    <Star key={i} stroke="#006C49" size={20} />
                                ))}
                            </div>
                            <span className="text-[#6C7A71] group-hover:text-[#006C49] transition-colors">
                                ({data.reviews.length} отзывов)
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Заголовок и цена */}
                    <motion.div variants={itemVariants} className="mt-4">
                        <motion.h2
                            variants={itemVariants}
                            className="text-5xl text-[#191C1F] mb-2 capitalize"
                        >
                            {data.name}
                        </motion.h2>
                        <motion.span
                            variants={itemVariants}
                            className="text-[#006C49] text-2xl font-semibold"
                        >
                            {data.cost}
                        </motion.span>
                    </motion.div>

                    {/* Описание */}
                    <motion.p
                        variants={itemVariants}
                        className="py-12 text-[#3C4A42] text-lg leading-relaxed"
                    >
                        {data.description}
                    </motion.p>

                    {/* Технические характеристики */}
                    <motion.ul
                        variants={itemVariants}
                        className="py-6 border-t border-b border-[#BBCABF] text-[#191C1f]"
                    >
                        <motion.li
                            variants={itemVariants}
                            className="text-[16px] font-semibold mb-6"
                        >
                            Технические характеристики
                        </motion.li>
                        <motion.ul variants={containerVariants}>
                            {data.technical.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    custom={index}
                                    className="flex justify-between mb-3 text-[16px]"
                                >
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-[#3C4A42]">{item.value}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.ul>

                    {/* Кнопки */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col gap-3 py-12"
                    >
                        <Button.primary
                            delay={0.6}
                            className="flex gap-4 justify-center w-full"
                        >
                            <ShoppingCart className="transition-transform group-hover:rotate-12" />
                            <span>Add to Cart</span>
                        </Button.primary>
                        <Button.ghost
                            delay={1}
                            className="flex gap-4 justify-center w-full"
                        >
                            <Heart className="transition-colors" />
                            <span>Add to Wishlist</span>
                        </Button.ghost>
                    </motion.div>
                </motion.div>
            </motion.div>

            <Reviews isOpen={isOpen} onClose={handleClose} data={data} />
        </div>
    )
}