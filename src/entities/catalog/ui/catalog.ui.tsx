import Container from "@/components/Container"
import { SidebarUi } from "./sidebar.ui"
import { ProductsUi } from "./products.ui"

export const CatalogUi = () => {
    return (
        <section>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6">
                    <SidebarUi className="md:col-span-2" />
                    <ProductsUi className="col-span-1 md:col-span-4" />
                </div>
            </Container>
        </section>
    )
}