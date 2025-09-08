import {describe, expect, it} from 'vitest';
import {calculateSubtotal} from '../calculateSubtotal';
import type {CartItem} from "../../shared";

describe('calculateSubtotal', () => {
    it('returns 0 for an empty cart', () => {
        const cart: CartItem[] = [];
        expect(calculateSubtotal(cart)).toBe(0);
    });

    it('calculates subtotal correctly for integer prices and quantities', () => {
        const cart: CartItem[] = [
            {id: '1', name: 'Item A', price: 10, quantity: 2}, // 20
            {id: '2', name: 'Item B', price: 5, quantity: 3},  // 15
        ];
        expect(calculateSubtotal(cart)).toBe(35);
    });

    it('calculates subtotal correctly for decimal prices', () => {
        const cart: CartItem[] = [
            {id: '1', name: 'Apple', price: 1.5, quantity: 2},   // 3.0
            {id: '2', name: 'Banana', price: 0.99, quantity: 1}, // 0.99
            {id: '3', name: 'Milk', price: 2.25, quantity: 2},   // 4.5
        ];
        const expected = 3.0 + 0.99 + 4.5; // 8.49
        expect(calculateSubtotal(cart)).toBeCloseTo(expected, 5);
    });
});