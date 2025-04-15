

export type Role = {
    id: number;
    name: string;
}

export type ProductType = {
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

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string | null;
    productType: ProductType;
}

export type CartItemId = {
    sequenceId: number;
    cartId: number;
}

export type CartItem = {
    id: CartItemId;
    cart: Cart;
    product: Product;
    quantity: number;
}

export type Order = {
    id: number;
    createdAt: string;
    status: string;
    totalPrice: number;
    user: User;
}

export type OrderDetail = {
    id: {
        sequenceId: number;
        orderId: number;
    };
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}