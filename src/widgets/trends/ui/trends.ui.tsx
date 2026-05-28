'use client'

import Container from "@/components/Container"
import { motion } from "framer-motion"
import { Flame, MoveRight } from "lucide-react"
import Link from "next/link"

export const TrendsUi = () => {
    return (
        <section>
            <Container>
                <div className="">
                    <div className="flex justify-between items-end mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className=""
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl text-[#191C1F] mb-2 flex gap-2"
                            >
                                <motion.div
                                    initial={{ opacity: 0, color: "#000000" }}
                                    whileInView={{ opacity: 1, color: "#10b981" }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <Flame size={36} />
                                </motion.div>
                                Сейчас в тренде
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-[16px] text-[#3C4A42]"
                            >
                                Самые любимые светильники нашего сообщества.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        >
                            <Link
                                href={''}
                                className="flex gap-2 items-center text-[#006C49] border-b border-transparent group transition-all duration-300 relative"
                            >
                                <motion.span
                                    whileHover={{ x: -4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Посмотреть всю коллекцию
                                </motion.span>
                                <motion.div
                                    whileHover={{ x: 4, rotate: 90 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                                >
                                    <MoveRight size={20} />
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    )
}