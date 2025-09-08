import type {CartItem} from "../shared";

export const removeItemFromCart = (cart: CartItem[], itemId: string): CartItem[] => {
    return cart.filter(item => item.id !== itemId);
};