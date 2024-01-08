import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import '@/styles/globals.css'
import {toast} from 'react-toastify'
import React, {useState, useEffect} from 'react';


export default function App({Component, pageProps}) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);


  useEffect(() => {


    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }

    } catch (error) {
      console.error(error);
      localStorage.clear();

    }

  }, [])

  //to preventing from reset cz of page reloading
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    // let myitem = Object.keys(myCart);
    // let total = 0;
    // for (let i = 0; i < myitem.length; i++) {
    //   const itemKey = myitem[i];
    //   const item = myCart[itemKey];
    //   total += item.qty * item.price;
    // }
    // console.log(total);
    // setSubTotal(total);
    // console.log(subTotal)
  }




  //Fuction for adding item in the cart
  const addToCart = (itemCode, qty, price, name, size, color, image) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }

    else {
      newCart[itemCode] = {qty: 1, price, name, size, color, image}
    }
    setCart(newCart);

    saveCart(newCart);
    toast.success('Item is added to Cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }



  const notify = () => toast("Wow so easy!");
  const handleQuantityChange = (itemCode, qty) => {
    qty = parseInt(qty, 10) || 0;

    // Update the quantity in the cart
    const newCart = {...cart};
    newCart[itemCode].qty += qty;

    // Ensure the quantity is not less than 1
    newCart[itemCode].qty = Math.max(1, newCart[itemCode].qty);

    // Update the state
    setCart(newCart);
    saveCart(newCart);
    toast.success('Updated the cart item', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  // Clear all the cart
  const clearCart = () => {
    setCart({})
    saveCart({});
    toast.success('The cart is now empty', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  return <>
    <Navbar cart={cart} handleQuantityChange={handleQuantityChange} clearCart={clearCart} addToCart={addToCart} subTotal={subTotal} />
    <Component cart={cart} clearCart={clearCart} subTotal={subTotal} addToCart={addToCart}  {...pageProps} />
    <Footer />
  </>
}








