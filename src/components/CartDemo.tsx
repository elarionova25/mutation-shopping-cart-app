import React, { useState } from 'react';
import { Button, Space, notification} from 'antd';
import {ShoppingCart} from "./ShoppingCart.tsx";
import type {CartItem} from "../shared";
import {addItemToCart} from "../helpers";

const demoProducts: CartItem[] = [
    {
        id: '1',
        name: 'Беспроводные наушники',
        price: 7999,
        quantity: 1,
        image: '../images/headphonesImage.png'
    },
    {
        id: '2',
        name: 'Умные часы',
        price: 14999,
        quantity: 1,
        image: '../images/watchImage.jpg'
    },
    {
        id: '3',
        name: 'USB-C кабель',
        price: 999,
        quantity: 1,
        image: '../images/cableImage.jpg'
    }
];

export const CartDemo: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addDemoProduct = (product: CartItem) => {
        const updatedCart = addItemToCart(cartItems, product);
        setCartItems(updatedCart);

        notification.success({
            message: 'Товар добавлен',
            description: `${product.name} добавлен в корзину`,
            placement: 'topRight'
        });
    };

    const clearCart = () => {
        setCartItems([]);
        notification.info({ message: 'Корзина очищена' });
    };

    return (
        <div style={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <h2>Товары</h2>
                    <Space wrap>
                        {demoProducts.map(product => (
                            <Button
                                key={product.id}
                                type="dashed"
                                onClick={() => addDemoProduct({ ...product })}
                            >
                                Добавить {product.name} ({product.price} ₽)
                            </Button>
                        ))}
                        <Button danger onClick={clearCart}>
                            Очистить корзину
                        </Button>
                    </Space>
                </div>

                <ShoppingCart
                    items={cartItems}
                    onItemsChange={setCartItems}
                    discountPercentage={10} // 10% скидка
                />
            </Space>
        </div>
    );
};