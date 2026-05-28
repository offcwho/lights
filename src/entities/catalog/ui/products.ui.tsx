import { ProductCard } from "@/components/Card"

interface Props {
    className?: string;
}

export const ProductsUi: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm md:text-[16px] text-[#55615A]">
                    Показано 24 из 63 товаров
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm md:text-[16px] text-[#6C7A71]">Сортировать по:</span>
                    <select name="" id="" value="qweqwqw" className="text-xs sm:text-sm md:text-base"></select>
                </div>
            </div>
            <div className="">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <ProductCard />
                </ul>
                <div className=""></div>
            </div>
        </div>
    )
}