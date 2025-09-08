
export const applyDiscount = (amount: number, discountPercent: number): number => {
    if (discountPercent < 0) return amount;
    if (discountPercent > 100) return 0;

    return amount * (1 - discountPercent / 100);
};