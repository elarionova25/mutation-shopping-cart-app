import {describe, expect, it} from 'vitest';
import {addItemToCart} from '../addItemToCart';
import type {CartItem} from "../../shared";

describe('addItemToCart', () => {
    const apple: CartItem = {id: '1', name: 'Apple', price: 1.5, quantity: 2};
    const banana: CartItem = {id: '2', name: 'Banana', price: 0.99, quantity: 1};

    it('adds a new item to an empty cart', () => {
        const cart: CartItem[] = [];
        const result = addItemToCart(cart, apple);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(apple);
        // immutability: original cart unchanged
        expect(cart).toHaveLength(0);
        expect(result).not.toBe(cart);
    });

    it('appends a new item when it does not exist', () => {
        const cart: CartItem[] = [apple];
        const result = addItemToCart(cart, banana);

        expect(result).toHaveLength(2);
        expect(result).toContainEqual(apple);
        expect(result).toContainEqual(banana);

        // immutability: original references preserved for unchanged items
        const originalAppleRef = cart[0];
        const resultingAppleRef = result.find(i => i.id === '1');
        expect(resultingAppleRef).toBe(originalAppleRef);

        // result array is a new reference
        expect(result).not.toBe(cart);
    });

    it('increments quantity when the item already exists', () => {
        const existing: CartItem = {id: '1', name: 'Apple', price: 1.5, quantity: 2};
        const cart: CartItem[] = [existing, banana];

        const result = addItemToCart(cart, {id: '1', name: 'Apple', price: 1.5, quantity: 3});

        // quantity should be summed: 2 + 3 = 5
        const updated = result.find(i => i.id === '1');
        expect(updated).toBeDefined();
        expect(updated!.quantity).toBe(5);

        // other items unchanged and keep same reference
        const bananaInResult = result.find(i => i.id === '2');
        expect(bananaInResult).toBe(cart[1]);

        // updated item is a new object (immutability for updated element)
        expect(updated).not.toBe(cart[0]);

        // original cart not mutated
        expect(cart[0].quantity).toBe(2);
    });
});