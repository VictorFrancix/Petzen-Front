import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";

import TestPage from "./components/TestPage.js";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import GlobalStyle from "./assets/GlobalStyle/GlobalStyle";
import UserContext from "./contexts/UserContext";

export default function App() {
    const [user, setUser] = useState({cart: []});

    function Error(e) {
        console.log(`${e.response.status} - ${e.response.statusText}`);
        alert("Um erro aconteceu, tente novamente");
    }

    return (
        <UserContext.Provider value={{user, setUser, Error}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
