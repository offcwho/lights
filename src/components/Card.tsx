import Link from "next/link"

export const ProductCard = () => {
    return (
        <li>
            <Link href={'/product/123'}>
                <img src="https://images.unsplash.com/photo-1777734582660-e0635eea3bd1?q=80&w=824&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="max-h-90 rounded-xl w-full mb-4" />
                <h4 className="text-lg mb-1 text-[#191C1F]">qweqwe</h4>
                <p className="text-sm text-[#3C4A42]">qweqwe</p>
                <span className="text-[#006C49] font-bold text-[16px]">$420.00</span>
            </Link>
        </li>
    )
}