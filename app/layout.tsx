import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Shop for Electronics, Fashion, and More! ShoppinCity",
  description: "Find a wide range of products from electronics to fashion, all at unbeatable prices. Enjoy fast shipping, secure payments, and excellent customer service. Shop now and experience the convenience of ShoppinCity!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} flex-col flex min-h-screen`}>

        <Navbar />
        <main className="flex flex-grow">
          {children}

        </main>
        <Footer />

      </body>

    </html>
  );
}
