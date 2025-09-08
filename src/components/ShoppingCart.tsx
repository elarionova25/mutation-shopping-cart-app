import React from 'react';
import {
    Card,
    List,
    Button,
    InputNumber,
    Divider,
    Typography,
    Space,
    Image,
    Tag,
    Badge,
    Empty
} from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    MinusOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import type {CartItem} from "../shared";
import {getCartTotal, removeItemFromCart, updateItemQuantity} from "../helpers";

const {Title, Text} = Typography;

interface ShoppingCartProps {
    items: CartItem[];
    onItemsChange: (items: CartItem[]) => void;
    discountPercentage?: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
                                                              items,
                                                              onItemsChange,
                                                              discountPercentage = 0
                                                          }) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = getCartTotal(items, discountPercentage);
    const discountAmount = subtotal - total;

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        const updatedCart = updateItemQuantity(items, itemId, newQuantity);
        onItemsChange(updatedCart);
    };

    const handleRemoveItem = (itemId: string) => {
        const updatedCart = removeItemFromCart(items, itemId);
        onItemsChange(updatedCart);
    };

    if (items.length === 0) {
        return (
            <Card className="cart-container">
                <Empty
                    image={<ShoppingCartOutlined style={{fontSize: 64, color: '#ddd'}}/>}
                    description="Ваша корзина пуста"
                />
            </Card>
        );
    }

    return (
        <div className="cart-container">
            <Card>
                <Title level={2} style={{marginBottom: 24}}>
                    <ShoppingCartOutlined/> Корзина покупок
                    <Badge
                        count={items.reduce((sum, item) => sum + item.quantity, 0)}
                        style={{marginLeft: 16, backgroundColor: '#1890ff'}}
                    />
                </Title>

                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined/>}
                                    onClick={() => handleRemoveItem(item.id)}
                                    aria-label="Удалить товар"
                                />
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Image
                                        width={80}
                                        height={80}
                                        src={item.image}
                                        alt={item.name}
                                        style={{objectFit: 'cover', borderRadius: 6}}
                                    />
                                }
                                title={
                                    <Space direction="vertical" size="small">
                                        <Text strong>{item.name}</Text>
                                        <Text type="secondary">{item.price.toFixed(2)} ₽ за шт.</Text>
                                    </Space>
                                }
                                description={
                                    <Space size="middle" style={{marginTop: 8}}>
                                        <Button
                                            icon={<MinusOutlined/>}
                                            size="small"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        />

                                        <InputNumber
                                            min={1}
                                            max={99}
                                            value={item.quantity}
                                            onChange={(value) => handleQuantityChange(item.id, value || 1)}
                                            style={{width: 60}}
                                        />

                                        <Button
                                            icon={<PlusOutlined/>}
                                            size="small"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        />

                                        <Text strong style={{marginLeft: 16}}>
                                            {(item.price * item.quantity).toFixed(2)} ₽
                                        </Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />

                <Divider/>

                <Space direction="vertical" style={{width: '100%'}} size="middle">
                    <div className="cart-summary">
                        <Space direction="vertical" style={{width: '100%'}} size="small">
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Text>Промежуточный итог:</Text>
                                <Text>{subtotal.toFixed(2)} ₽</Text>
                            </div>

                            {discountPercentage > 0 && (
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Text>
                                        Скидка ({discountPercentage}%):
                                        <Tag color="green" style={{marginLeft: 8}}>
                                            -{discountAmount.toFixed(2)} ₽
                                        </Tag>
                                    </Text>
                                    <Text type="success">-{discountAmount.toFixed(2)} ₽</Text>
                                </div>
                            )}

                            <Divider style={{margin: '12px 0'}}/>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Text strong>Итого к оплате:</Text>
                                <Title level={3} style={{margin: 0, color: '#1890ff'}}>
                                    {total.toFixed(2)} ₽
                                </Title>
                            </div>
                        </Space>
                    </div>

                    <Button type="primary" size="large" block style={{height: 48}}>
                        Перейти к оформлению
                    </Button>
                </Space>
            </Card>
        </div>
    );
};