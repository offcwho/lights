export interface ProductType {
    name: string;
    cost: string;
    images: {
        image: string;
    }[];
    description: string;
    technical: {
        name: string;
        value: string;
    }[];
    reviews: {
        name: string;
        rating: number;
        review: string;
        date: string;
    }[];
    views?: number;
}