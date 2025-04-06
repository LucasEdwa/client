import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  quantity: number;
}

export function useAddToCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const getCartItems = () => cart;

  return { cart, addToCart, getCartItems };
}
