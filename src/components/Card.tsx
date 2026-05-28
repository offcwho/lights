import Link from "next/link"

export const ProductCard = () => {
    return (
        <li>
            <Link href={''}>
                <img src="" alt="" className="max-h-90 rounded-xl w-full mb-4" />
                <h4 className="text-lg mb-1 text-[#191C1F]">qweqwe</h4>
                <p className="text-sm text-[#3C4A42]">qweqwe</p>
                <span className="text-[#006C49] font-bold text-[16px]">$420.00</span>
            </Link>
        </li>
    )
}