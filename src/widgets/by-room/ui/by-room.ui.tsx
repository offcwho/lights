'use client'

import Container from "@/components/Container";
import { ByRoomList } from "./by-room-list.ui";
import { motion } from "framer-motion";

export const ByRoomUi = () => {
    return (
        <section>
            <Container>
                <div className="px-2 sm:px-4">
                    {/* Title */}
                    <div className="flex flex-col mb-8 sm:mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-2xl sm:text-3xl md:text-4xl font-semibold"
                        >
                            Покупайте по комнатам
                        </motion.h2>

                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "5rem", opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="h-1 bg-[#10B981] rounded-full mt-2"
                        />
                    </div>
                    {/* Content */}
                    <ByRoomList />
                </div>
            </Container>
        </section>
    )
}