import {describe, expect, it} from 'vitest';
import {updateItemQuantity} from '../updateItemQuantity';
import type {CartItem} from '../../shared';

describe('updateItemQuantity', () => {
    const apple: CartItem = {id: '1', name: 'Apple', price: 1.5, quantity: 2};
    const banana: CartItem = {id: '2', name: 'Banana', price: 0.99, quantity: 1};

    it('updates the quantity of an existing item', () => {
        const cart: CartItem[] = [apple, banana];
        const result = updateItemQuantity(cart, '1', 10);

        expect(result).toHaveLength(2);
        const updated = result.find(i => i.id === '1')!;
        expect(updated.quantity).toBe(10);

        // updated item is a new object
        expect(updated).not.toBe(cart[0]);

        // unaffected items keep same reference
        const unchanged = result.find(i => i.id === '2')!;
        expect(unchanged).toBe(cart[1]);

        // original cart unchanged
        expect(cart[0].quantity).toBe(2);
    });

    it('removes the item when newQuantity <= 0', () => {
        const cart: CartItem[] = [apple, banana];
        const resultZero = updateItemQuantity(cart, '1', 0);
        const resultNegative = updateItemQuantity(cart, '1', -5);

        expect(resultZero).toHaveLength(1);
        expect(resultZero[0]).toEqual(banana);

        expect(resultNegative).toHaveLength(1);
        expect(resultNegative[0]).toEqual(banana);

        // original cart unchanged
        expect(cart).toEqual([apple, banana]);
    });

    it('returns updated array with same contents when id not found', () => {
        const cart: CartItem[] = [apple, banana];
        const result = updateItemQuantity(cart, 'non-existent', 7);

        expect(result).toHaveLength(2);
        expect(result).toEqual(cart);

        // map should produce a new array reference
        expect(result).not.toBe(cart);

        // element references should be preserved since none were updated
        expect(result[0]).toBe(cart[0]);
        expect(result[1]).toBe(cart[1]);
    });
});