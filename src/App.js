import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line



import TestPage from "./components/TestPage.js";
import Login from "./components/Login";
import SignUp from "./components/Sign-Up";
import Menu from "./components/Menu.js";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ProductsPage from "./components/ProductsPage.js";
import ProductDetailsPage from "./components/ProductDetailsPage.js";
import Profile from "./components/Profile.js";
import GlobalStyle from "./assets/GlobalStyle/GlobalStyle";
import UserContext from "./contexts/UserContext";


export default function App() {
    const [user, setUser] = useState({});

    function Error(e) {
        console.log(`${e.response.status} - ${e.response.statusText}`);
        alert("Um erro aconteceu, tente novamente");
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            Error
        }}>
            <BrowserRouter>
                <GlobalStyle />
                    <Menu />
                    <Routes>
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:productId" element={<ProductDetailsPage />} />
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}