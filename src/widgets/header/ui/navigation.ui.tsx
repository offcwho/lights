'use client'

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Catalog",
        link: "/catalog"
    },
];

const linkVariants: Variants = {
    inactive: {
        width: "0%",
        left: "50%"
    },
    active: {
        width: "100%",
        left: "0%",
        transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 300
        }
    }
};

const liVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 200
        }
    })
};

export const Navigation = () => {
    const [active, setIsActive] = useState(-1);
    const [url, setUrl] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const segments = pathname.split('/').filter(Boolean);
            const firstSegment = "/" + segments[0];
            setUrl(firstSegment);
        }
    })
    return (
        <menu className="flex gap-8">
            {navigation.map((item, index) => (
                <motion.li
                    key={index}
                    custom={index}
                    variants={liVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setIsActive(index)}
                    className="flex items-center relative cursor-pointer"
                >
                    <Link
                        href={item.link}
                        className={`py-1.5 inline-block relative hover:text-[#059669] transition-colors duration-300 ${active === index || url === item.link || url === "/undefined" && item.link === "/" ? 'text-[#059669]' : 'text-[#475569]'}`}
                    >
                        {item.name}
                    </Link>

                    <motion.div
                        variants={linkVariants}
                        initial="inactive"
                        animate={active === index || url === item.link || url === "/undefined" && item.link === "/" ? "active" : "inactive"}
                        className="absolute bottom-0 h-0.5 bg-[#059669]"
                    />
                </motion.li>
            ))}
        </menu>
    )
}