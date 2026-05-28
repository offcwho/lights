import { ProductCard } from "@/components/Card"

interface Props {
    className?: string;
}

export const ProductsUi: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <div className="flex justify-between">
                <span className="text-[#55615A] text-[16px]">
                    Showing 24 of 63 items
                </span>
                <div className="">
                    <span className="text-[#6C7A71] text-[16px]">Sort by:</span>
                    <select name="" id="" value="qweqwqw"></select>
                </div>
            </div>
            <div className="">
                <ul className="grid grid-cols-3">
                    <ProductCard />
                </ul>
                <div className=""></div>
            </div>
        </div>
    )
}