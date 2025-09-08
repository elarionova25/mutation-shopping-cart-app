import {describe, expect, it} from 'vitest';
import {removeItemFromCart} from '../removeItemFromCart';
import type {CartItem} from '../../shared';

describe('removeItemFromCart', () => {
    const apple: CartItem = {id: '1', name: 'Apple', price: 1.5, quantity: 2};
    const banana: CartItem = {id: '2', name: 'Banana', price: 0.99, quantity: 1};

    it('removes an item by id', () => {
        const cart: CartItem[] = [apple, banana];
        const result = removeItemFromCart(cart, '1');

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(banana);
        // should be a new array reference
        expect(result).not.toBe(cart);
        // original cart unchanged
        expect(cart).toEqual([apple, banana]);
    });

    it('returns same items when id not found (new array reference)', () => {
        const cart: CartItem[] = [apple, banana];
        const result = removeItemFromCart(cart, 'non-existent');

        expect(result).toHaveLength(2);
        expect(result).toEqual(cart);
        // ensure new array reference (filter produces a new array even if no elements removed)
        expect(result).not.toBe(cart);
        // ensure element references are preserved
        expect(result[0]).toBe(cart[0]);
        expect(result[1]).toBe(cart[1]);
    });
});