'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { cartProductType } from "../Components/ProductDetails";
type CartContextProps = {
    cartQty: number;

    cartItem: cartProductType[];
    wishlist: cartProductType[];
    addToCart: (product: cartProductType) => void;
    handleQtyChange: (num: number, product: cartProductType) => void;
    removeItemsFromCart: (product: cartProductType) => void;
    addToWishlist: (product: cartProductType) => void;
    removeFromWishlist: (product: cartProductType) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartQty, setCartQty] = useState(0);
    const [cartItem, setCartItem] = useState<cartProductType[]>([]);
    const [wishlist, setWishlist] = useState<cartProductType[]>([])


    useEffect(() => {
        const localCartItems = localStorage.getItem('localCartItems');
        const localCartQty = localStorage.getItem('localCartQty');
        const localwishlist = localStorage.getItem('localWishlist')

        if (localCartItems) {
            const parsedItems: cartProductType[] = JSON.parse(localCartItems);
            setCartItem(parsedItems);
        }
        if (localCartQty) {
            const parsedQty = parseInt(localCartQty, 10);
            setCartQty(parsedQty);
        }
        if (localwishlist) {
            const parsedWishlist: cartProductType[] = JSON.parse(localwishlist);
            setWishlist(parsedWishlist)
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
    // This function handles the change in the quantity of the cart product
    const handleQtyChange = (num: number, product: cartProductType) => {
        setCartItem(prev => {
            const productIndex = prev.findIndex(item => (item.id === product.id && item.selectImg.color === product.selectImg.color));
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
    // This function removes items from the cart
    function removeItemsFromCart(product: cartProductType) {
        console.log(cartItem)
        setCartItem(prev => {
            const newCart = prev.filter(item => !(product.id === item.id && product.selectImg.color === item.selectImg.color));
            localStorage.setItem('localCartItems', JSON.stringify(newCart));
            return newCart
        })
        console.log(cartItem)

        setCartQty(prev => {
            const newQty = prev - product.quantity;
            localStorage.setItem('localCartQty', JSON.stringify(newQty))
            return newQty
        })



    }
    //Function to add items to the wishlist
    const addToWishlist = (product: cartProductType) => {
        setWishlist(prev => {
            if (!prev.find(item => item.id === product.id)) {

                const newWishlist = [...prev, product]
                localStorage.setItem('localWishlist', JSON.stringify(newWishlist))
                return newWishlist
            }
            return prev;
        })
    }
    //function to remove the item  from the wishlist
    const removeFromWishlist = (product: cartProductType) => {
        setWishlist(prev => {
            const newWishlist = prev.filter(item => item.id !== product.id);
            localStorage.setItem('localWishlist', JSON.stringify(newWishlist));
            return newWishlist;
        })
    }

    return (
        <CartContext.Provider value={{ cartQty, cartItem, addToCart, handleQtyChange, removeItemsFromCart, wishlist, addToWishlist, removeFromWishlist }}>
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
