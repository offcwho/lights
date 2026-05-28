'use client'

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const imageUrl = "https://images.unsplash.com/photo-1777734582660-e0635eea3bd1?q=80&w=824&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const items = [
    { id: 1, title: "Кухня и столовая", description: "Возвысьте вашу кулинарную святилище.", image: imageUrl },
    { id: 2, title: "Кухня и столовая", description: "Возвысьте вашу кулинарную святилище.", image: imageUrl },
    { id: 3, title: "Кухня и столовая", description: "Возвысьте вашу кулинарную святилище.", image: imageUrl },
    { id: 4, title: "Кухня и столовая", description: "Возвысьте вашу кулинарную святилище.", image: imageUrl },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const overlayVariants: Variants = {
    inactive: {
        opacity: 0.4
    },
    active: {
        opacity: 0.85,
        transition: {
            duration: 0.3
        }
    }
}

export const ByRoomList = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [isHover, setIsHover] = useState(-1)

    const getPos = (index: number) => {
        switch (index) {
            case 0: return "col-span-2 md:row-span-2 sm:col-span-1";
            case 1: return "col-span-2 md:col-start-3 sm:col-span-1";
            case 2: return "md:col-start-3 md:row-start-2 sm:col-span-1";
            case 3: return "md:col-start-4 md:row-start-2 sm:col-span-1";
            default: return "";
        }
    };

    return (
        <motion.ul
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 grid-rows-2 gap-2 sm:gap-4 md:gap-6 max-h-150"
        >
            {items.map((item, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(-1)}
                    className={`${getPos(index)} relative w-full h-full rounded-xl overflow-hidden`}
                >
                    <Link href={''} className="block w-full h-full">
                        {/* Background Image */}
                        <img
                            width={200}
                            height={200}
                            alt={item.description}
                            src={item.image}
                            className="w-full h-full object-cover"
                        />
                        {/* Blur */}
                        <motion.div
                            variants={overlayVariants}
                            initial="inactive"
                            animate={isHover === index ? "active" : "inactive"}
                            className="absolute w-full h-full top-0 left-0"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)'
                            }}
                        />


                        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-8">
                            <AnimatePresence mode="wait">
                                {isHover === index && (
                                    <motion.div
                                        key="long-text"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full"
                                    >
                                        <motion.p className="text-white/80 text-xs sm:text-sm md:text-base max-h-55 line-clamp-4">
                                            Превратите свое пространство в уютный уголок с помощью нашей продуманной коллекции светильников. От минималистичного дизайна до классических форм - каждый светильник создан для того, чтобы создать идеальную атмосферу в вашем доме и подчеркнуть его стиль.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="w-full">
                                <motion.div
                                    layout
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-2">{item.title}</h3>
                                    <AnimatePresence mode="wait">
                                        {isHover !== index ? (
                                            <motion.p
                                                key="short-description"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-white/60 text-xs sm:text-sm md:text-base"
                                            >
                                                {item.description}
                                            </motion.p>
                                        ) : (
                                            <motion.p
                                                key="expanded-description"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-white/80 text-xs sm:text-sm md:text-base"
                                            >
                                                {item.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </div>
                    </Link>
                </motion.li>
            ))}
        </motion.ul>
    )
}