import {removeItemFromCart} from "./removeItemFromCart.ts";
import type {CartItem} from "../shared";

export const updateItemQuantity = (
    cart: CartItem[],
    itemId: string,
    newQuantity: number
): CartItem[] => {
    if (newQuantity <= 0) {
        return removeItemFromCart(cart, itemId);
    }

    return cart.map(item =>
        item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
    );
};
