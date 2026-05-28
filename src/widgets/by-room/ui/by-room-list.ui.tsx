'use client'

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const imageUrl = "https://cdn.discordapp.com/attachments/744857052924346419/1501560305635950612/AB6AXuB67n2fEAaUi-0OWFVHnSHKbOjS2H8ZPglPcQ6vc9t7v86m349B1hoqhcrC39TV_1IWnc_AZYSDb3iIuQL6rK6kklXqMCTm6seWGP-QqZXX_CLnHW2AAl-Da_qHMcKAlGiSUkkfKuKqAuBUMFV-lbGKSX-7RLVEN7CBgGYh2HZ9CbvdcsLhQFmVWV7E3phkHdytOlM62yXkF-RyQxcYu735npUEj8J.png?ex=69fc8482&is=69fb3302&hm=eb89cb4d4feb785db1f3a67135434a5277ad0a58296309a9182e7a5118e979af&"

const items = [
    { id: 1, title: "Kitchen & Dining", description: "Elevate your culinary sanctuary.", image: imageUrl },
    { id: 2, title: "Kitchen & Dining", description: "Elevate your culinary sanctuary.", image: imageUrl },
    { id: 3, title: "Kitchen & Dining", description: "Elevate your culinary sanctuary.", image: imageUrl },
    { id: 4, title: "Kitchen & Dining", description: "Elevate your culinary sanctuary.", image: imageUrl },
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
            case 0: return "col-span-2 row-span-2";
            case 1: return "col-span-2 col-start-3";
            case 2: return "col-start-3 row-start-2";
            case 3: return "col-start-4 row-start-2";
            default: return "";
        }
    };

    return (
        <motion.ul
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-4 grid-rows-2 gap-6 max-h-150"
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


                        <div className="absolute inset-0 flex flex-col justify-between p-8">
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
                                        <motion.p className="text-white/80 text-sm max-h-55 line-clamp-4">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consequatur odio quam, cupiditate error, iste nemo velit perferendis ex laborum delectus rerum temporibus autem dolorum totam odit ullam harum nobis a et vero dolore doloribus animi. Earum sunt quas corporis.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="w-full">
                                <motion.div
                                    layout
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-white text-2xl mb-2">{item.title}</h3>
                                    <AnimatePresence mode="wait">
                                        {isHover !== index ? (
                                            <motion.p
                                                key="short-description"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-white/60 text-sm"
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
                                                className="text-white/80 text-sm"
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