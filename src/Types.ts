export interface Pizza {
    id: number,
    name: string,
    description: string,
    price: number,
    specialOffer?: boolean
}

export interface CartItem {
    id: number
    name: string,
    price: number,
    quantity: number
}