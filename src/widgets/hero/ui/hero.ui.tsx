'use client'

import { Button } from "@/components/Button";
import Container from "@/components/Container"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/../public/site/hero/main.png";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";

const blurIn: Variants = {
    initial: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
};

export const HeroUi = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        const handleResize = () => {
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                height: `calc(100vh - ${headerHeight}px)`
            }}
            className="relative overflow-hidden"
        >
            {/* Фоновое изображение */}
            <div className="absolute z-0 h-full w-full">
                <div className="relative w-full h-full">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={blurIn}
                        style={{
                            scale: scale,
                            y: y
                        }}
                        className="absolute z-0 h-full w-full"
                    >
                        <Image
                            src={heroImage}
                            alt="hero image"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute z-1 w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, #F7F9FD 30%, rgba(247, 249, 253, 0) 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Контент */}
            <Container className="h-full relative">
                <motion.div
                    className="max-w-2xl h-full flex flex-col justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Badge */}
                    <motion.div
                        variants={textVariants}
                        className="mb-6 overflow-hidden"
                    >
                        <motion.span
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-block px-4 py-2 bg-[#006C49]/10 text-[#006C49] rounded-full text-sm font-medium"
                        >
                            ✨ Новая Коллекция 2026
                        </motion.span>
                    </motion.div>

                    {/* Заголовок */}
                    <motion.h1
                        variants={textVariants}
                        className="text-6xl font-bold mb-5 text-[#191C1F] leading-tight"
                    >
                        Свет для
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
                            className="text-[#006C49] block"
                        >
                            сознательных пространств
                        </motion.span>
                    </motion.h1>

                    {/* Описание */}
                    <motion.p
                        variants={textVariants}
                        className="text-lg text-[#3C4A42] leading-relaxed max-w-xl"
                    >
                        Откройте пересечение архитектурной формы и устойчивого мастерства.
                        Наша последняя коллекция светильников приносит органичное тепло в ваш современный дом.
                    </motion.p>

                    {/* Кнопки */}
                    <motion.div
                        variants={textVariants}
                        className="mt-10 flex gap-6"
                    >
                        <Button.primary delay={0} className="relative overflow-hidden group">
                            <motion.span
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                            <span className="relative">Купить новые поступления</span>
                        </Button.primary>

                        <Button.ghost delay={0.3} className="relative overflow-hidden group">
                            <motion.span
                                className="absolute inset-0 bg-[#006C49]/10"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative flex items-center gap-2">
                                Посмотреть каталог
                                <motion.span
                                    animate={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    →
                                </motion.span>
                            </span>
                        </Button.ghost>
                    </motion.div>

                    {/* Scroll индикатор */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-2 text-[#3C4A42] text-sm"
                        >
                            <span>Прокрутите, чтобы исследовать</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <motion.path
                                    d="M12 5V19M12 19L5 12M12 19L19 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    )
}