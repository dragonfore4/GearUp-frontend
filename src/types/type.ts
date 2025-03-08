export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string | null;
};

export type Role =  {
    id: number;
    name: string;
}

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
}

export type Cart = {
    id: number;
    user: User;
}

export type Product= {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string | null;
}

export type CartItemId = {
    sequenceId: number;
    cartId: number;
}

export type CartItem  = {
    id: CartItemId;
    cart: Cart;
    product: Product;
    quantity: number;
}

// Define an array of CartItem
export type CartData = CartItem[];
