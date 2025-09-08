import type {CartItem} from "../shared";

export const addItemToCart = (cart: CartItem[], newItem: CartItem): CartItem[] => {
    const existingItem = cart.find(item => item.id === newItem.id);

    if (existingItem) {
        return cart.map(item =>
            item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
        );
    }

    return [...cart, { ...newItem }];
};
