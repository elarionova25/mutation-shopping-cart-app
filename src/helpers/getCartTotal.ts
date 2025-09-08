import type {CartItem} from "../shared";
import {calculateSubtotal} from "./calculateSubtotal.ts";
import {applyDiscount} from "./applyDiscount.ts";

export const getCartTotal = (cart: CartItem[], discountPercent: number = 0): number => {
    const subtotal = calculateSubtotal(cart);
    return applyDiscount(subtotal, discountPercent);
};