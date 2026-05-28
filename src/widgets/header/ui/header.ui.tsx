import Container from "@/components/Container";
import { Navigation } from "./navigation.ui";
import { ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";

export const HeaderUi = () => {
    return (
        <header className="py-6 shadow-[0_2px_0_0_#00000015] z-9999 sticky top-0 bg-white">
            <Container className="py-0!">
                <div className="">
                    {/* Logo */}
                </div>
                <div className="flex justify-between">
                    <Navigation />
                    <div className="">
                        {/* This search */}
                    </div>
                    <div className="flex gap-2">
                        {/* Change next time */}
                        <Link href={'/cart'} className="p-2">
                            <ShoppingCart size={20} color="#3C4A42" />
                        </Link>
                        <Link href={'/profile'} className="p-2">
                            <UserRound size={20} color="#3C4A42" />
                        </Link>
                    </div>
                </div>
            </Container>
        </header>
    )
}