'use client';
import { Provider } from "react-redux";

import store from "@/src/Redux/store.js";
import { CartProvider } from "@/src/context/CartContext.js";
import { ProductProvider } from "@/src/context/productContext.js";
import { UserProvider } from "@/src/context/userContext.js";
import "./globals.css"
import Navbar from "../(components)/navbar/Navbar";
export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <CartProvider>
        <ProductProvider>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </ProductProvider>
      </CartProvider>
    </Provider>
  );
}
