'use client'

import { PriceRange } from "@/components/PriceRange"
import { CategoriesData } from "../module/catalog.data"

interface Props {
    className?: string;
}

export const SidebarUi: React.FC<Props> = ({ className }) => {
    const handlePriceChange = (values: { min: number; max: number }) => {
        console.log('Выбранный диапазон:', values)
        // Здесь вы можете фильтровать товары
    }

    return (
        <div className={className}>
            <ul className="p-3 sm:p-4 md:p-6">
                <li className="text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 text-[#55615A]">КАТЕГОРИИ</li>
                <ul className="flex flex-col gap-2 sm:gap-3 text-[#3C4A42]">
                    {CategoriesData.map((item, index) => (
                        <li
                            key={index}
                            className="text-sm sm:text-base md:text-[16px]"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </ul>
            <div className="mx-3 sm:mx-4 md:mx-6 border-b border-[#BBCABF]"></div>
            <div className="">
                <PriceRange
                    min={150}
                    max={2500}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
    )
}