import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import './globals.css';

import { CartProvider } from "../hooks/useCart";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";
import { getUser } from "../actions/getUser";


const roboto = Roboto({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Shop for Electronics, Fashion, and More! ShoppinCity",
  description: "Find a wide range of products from electronics to fashion, all at unbeatable prices. Enjoy fast shipping, secure payments, and excellent customer service. Shop now and experience the convenience of ShoppinCity!",
  icons: {
    icon: '/favicon.webp'
  }
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const User = await getUser();


  return (
    <html lang="en">
      <body className={`${roboto.className} flex-col flex min-h-screen`}>
        <CartProvider>
          <Navbar isLogged={User} />
          <main className="flex  flex-grow">
            <Toaster />
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
