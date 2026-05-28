'use client'

import { AnimatePresence, motion, useMotionValue, Variants } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductType } from "../module/product.type";

interface Props {
    data: ProductType
}

const imageVariants: Variants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }
    }
};

export const ProductSliderUi: React.FC<Props> = ({ data }) => {
    const scrollX = useMotionValue(0);
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth + 30;
            setDragConstraints({
                left: -maxScroll,
                right: 0
            });
        }
    }, [data.images]);

    const handleMainDragEnd = (event: any, info: any) => {
        if (Math.abs(info.offset.x) > 50) {
            if (info.offset.x > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % data.images.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

    const images = data.images.map(img => img.image);

    return (
        <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className=""
        >
            {/* изображение */}
            <motion.div
                className="relative mb-4 h-125 overflow-hidden rounded-2xl bg-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${data.description} ${currentIndex + 1}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={handleMainDragEnd}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.1 }
                        }}
                        className="w-full h-125 object-cover cursor-grab active:cursor-grabbing"
                    />
                </AnimatePresence>

                {/* Кнопки навигации с анимацией появления */}
                {images.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        <motion.button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </motion.div>
                )}

                {/* Индикатор текущего слайда */}
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                >
                    {currentIndex + 1} / {images.length}
                </motion.div>
            </motion.div>

            {/* Превью снизу */}
            {images.length > 1 && (
                <motion.div
                    className="relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                >
                    <motion.div
                        ref={containerRef}
                        className="flex gap-3 pb-4 cursor-grab active:cursor-grabbing p-2"
                        drag="x"
                        dragElastic={0.1}
                        dragMomentum={true}
                        dragConstraints={dragConstraints}
                        style={{ x: scrollX }}
                        whileDrag={{ cursor: "grabbing" }}
                    >
                        {images.map((image, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                                className={`relative shrink-0 rounded-lg overflow-hidden transition-all select-none cursor-grabbing ${currentIndex === index
                                    ? "ring-2 ring-[#006C49] shadow-lg"
                                    : "opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover select-none pointer-events-none"
                                    draggable={false}
                                />
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Градиенты с анимацией появления */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-4 w-8 bg-linear-to-r h-full from-white to-transparent pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l h-full from-white to-transparent pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                    />
                </motion.div>
            )}
        </motion.div>
    )
}