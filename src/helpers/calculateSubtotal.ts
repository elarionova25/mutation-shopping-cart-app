import type {CartItem} from "../shared";

export const calculateSubtotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};