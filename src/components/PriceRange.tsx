'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PriceRangeProps {
    min?: number
    max?: number
    onChange?: (values: { min: number; max: number }) => void
}

export const PriceRange: React.FC<PriceRangeProps> = ({
    min = 150,
    max = 2500,
    onChange
}) => {
    const [minValue, setMinValue] = useState(min)
    const [maxValue, setMaxValue] = useState(max)
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
    const sliderRef = useRef<HTMLDivElement>(null)

    const totalRange = 3000 // Максимальное значение диапазона
    const minLimit = 0
    const maxLimit = 3000

    const getPercentage = (value: number) => {
        return ((value - minLimit) / (maxLimit - minLimit)) * 100
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return

        const rect = sliderRef.current.getBoundingClientRect()
        const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
        const percentage = x / rect.width
        let newValue = Math.round(minLimit + percentage * (maxLimit - minLimit))

        // Ограничиваем значения
        if (isDragging === 'min') {
            newValue = Math.min(newValue, maxValue - 10)
            newValue = Math.max(newValue, minLimit)
            setMinValue(newValue)
        } else {
            newValue = Math.max(newValue, minValue + 10)
            newValue = Math.min(newValue, maxLimit)
            setMaxValue(newValue)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(null)
        onChange?.({ min: minValue, max: maxValue })
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, minValue, maxValue])

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-sm tracking-widest text-[#55615A] mb-4">PRICE RANGE</h3>
            
            {/* Значения */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                    <span className="text-sm text-gray-500">Min</span>
                    <p className="text-2xl font-bold text-gray-800">${minValue}</p>
                </div>
                <div className="text-gray-400 text-xl">—</div>
                <div className="text-center">
                    <span className="text-sm text-gray-500">Max</span>
                    <p className="text-2xl font-bold text-gray-800">${maxValue}</p>
                </div>
            </div>

            {/* Слайдер */}
            <div
                ref={sliderRef}
                className="relative h-2 bg-gray-200 rounded-full mb-6 cursor-pointer"
            >
                {/* Заполненная область */}
                <div
                    className="absolute h-full bg-[#006C49] rounded-full"
                    style={{
                        left: `${getPercentage(minValue)}%`,
                        right: `${100 - getPercentage(maxValue)}%`
                    }}
                />

                {/* Ползунок Min */}
                <div
                    className="absolute w-5 h-5 bg-white border-2 border-[#006C49] rounded-full shadow-md -top-1.5 cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                    style={{ left: `${getPercentage(minValue)}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={() => setIsDragging('min')}
                />

                {/* Ползунок Max */}
                <div
                    className="absolute w-5 h-5 bg-white border-2 border-[#006C49] rounded-full shadow-md -top-1.5 cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                    style={{ left: `${getPercentage(maxValue)}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={() => setIsDragging('max')}
                />
            </div>

            {/* Input поля 
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">От</label>
                    <input
                        type="number"
                        value={minValue}
                        onChange={(e) => {
                            const val = Math.min(Number(e.target.value), maxValue - 10)
                            setMinValue(val)
                            onChange?.({ min: val, max: maxValue })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006C49]"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">До</label>
                    <input
                        type="number"
                        value={maxValue}
                        onChange={(e) => {
                            const val = Math.max(Number(e.target.value), minValue + 10)
                            setMaxValue(val)
                            onChange?.({ min: minValue, max: val })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006C49]"
                    />
                </div>
            </div>*/}

            {/* Кнопка применить */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange?.({ min: minValue, max: maxValue })}
                className="w-full mt-6 bg-[#006C49] text-white py-2 rounded-lg font-semibold hover:bg-[#008A5E] transition-colors"
            >
                Применить
            </motion.button>
        </div>
    )
}