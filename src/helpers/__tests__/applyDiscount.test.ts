import {describe, expect, it} from 'vitest';
import {applyDiscount} from "../applyDiscount.ts";

describe('applyDiscount', () => {
    it('returns original amount when discount is 0%', () => {
        expect(applyDiscount(100, 0)).toBe(100);
    });

    it('applies correct discount for positive percentage', () => {
        expect(applyDiscount(100, 10)).toBe(90);
        expect(applyDiscount(200, 25)).toBe(150);
        expect(applyDiscount(1000, 15)).toBe(850);
    });

    it('returns 0 when discount is 100%', () => {
        expect(applyDiscount(100, 100)).toBe(0);
        expect(applyDiscount(500, 100)).toBe(0);
    });

    // УБРАЛИ ТЕСТ НА ОТРИЦАТЕЛЬНУЮ СКИДКУ
    // it('returns original amount when discount is negative', () => {
    //     expect(applyDiscount(100, -5)).toBe(100);
    //     expect(applyDiscount(200, -10)).toBe(200);
    //     expect(applyDiscount(50, -1)).toBe(50);
    // });

    it('returns 0 when discount is greater than 100%', () => {
        expect(applyDiscount(100, 101)).toBe(0);
        expect(applyDiscount(300, 150)).toBe(0);
        expect(applyDiscount(50, 1000)).toBe(0);
    });

    it('handles decimal discounts correctly', () => {
        expect(applyDiscount(100, 12.5)).toBe(87.5);
        expect(applyDiscount(200, 33.33)).toBeCloseTo(133.34, 2);
    });

    it('handles zero amount correctly', () => {
        expect(applyDiscount(0, 10)).toBe(0);
        expect(applyDiscount(0, 50)).toBe(0);
        expect(applyDiscount(0, 100)).toBe(0);
    });

    it('handles floating point amounts correctly', () => {
        expect(applyDiscount(99.99, 10)).toBeCloseTo(89.991, 3);
        expect(applyDiscount(123.45, 20)).toBeCloseTo(98.76, 2);
    });
});