import Container from "@/components/Container"
import { Product } from ".."

interface Props {
    slug: string;
}

export const ProductPageUi: React.FC<Props> = ({ slug }) => {
    return (
        <section>
            <Container className="">
                <Product slug={slug} />
            </Container>
        </section>
    )
}