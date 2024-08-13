'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { cartProductType } from "../Components/ProductDetails";

type CartContextProps = {
    cartQty: number;
    cartItem: cartProductType[];
    addToCart: (product: cartProductType) => void;
    handleQtyChange: (num: number, product: cartProductType) => void
    removeItemsFromCart: (product: cartProductType) => void
}

const CartContext = createContext<CartContextProps | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartQty, setCartQty] = useState(0);
    const [cartItem, setCartItem] = useState<cartProductType[]>([]);


    useEffect(() => {
        const localCartItems = localStorage.getItem('localCartItems');
        const localCartQty = localStorage.getItem('localCartQty');

        if (localCartItems) {
            const parsedItems: cartProductType[] = JSON.parse(localCartItems);
            setCartItem(parsedItems);
        }
        if (localCartQty) {
            const parsedQty = parseInt(localCartQty, 10);
            setCartQty(parsedQty);
        }
    }, []);



    const addToCart = (product: cartProductType) => {
        setCartItem(prev => {
            const newCart = [...prev, product];
            localStorage.setItem('localCartItems', JSON.stringify(newCart));
            return newCart;
        });
        setCartQty(prev => {
            const newQty = prev + product.quantity;
            localStorage.setItem('localCartQty', newQty.toString());
            return newQty;
        });
    }
    const handleQtyChange = (num: number, product: cartProductType) => {
        setCartItem(prev => {
            const productIndex = prev.findIndex(item => item.id === product.id);
            if (productIndex === -1) return prev; // If product is not found, return the previous state

            const newCart = [...prev];
            newCart[productIndex] = {
                ...newCart[productIndex],
                quantity: newCart[productIndex].quantity + num
            };

            if (newCart[productIndex].quantity <= 0) {
                newCart.splice(productIndex, 1); // Remove item if quantity is 0 or less
            }

            localStorage.setItem('localCartItems', JSON.stringify(newCart));
            return newCart;
        });

        setCartQty(prev => {
            const newQty = prev + num;
            localStorage.setItem('localCartQty', newQty.toString());
            return newQty;
        });
    };
    function removeItemsFromCart(product: cartProductType) {
        setCartItem(prev => {
            const newCart = prev.filter(item => product.id !== item.id);
            localStorage.setItem('localCartItems', JSON.stringify(newCart));
            return newCart
        })

        setCartQty(prev => {
            const newQty = prev - product.quantity;
            localStorage.setItem('localCartQty', JSON.stringify(newQty))
            return newQty
        })



    }

    return (
        <CartContext.Provider value={{ cartQty, cartItem, addToCart, handleQtyChange, removeItemsFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Creating the useCart hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
