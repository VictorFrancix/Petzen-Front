import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from "./components/TestPage.js";
import Cart from "./components/Cart";
import GlobalStyle from "./assets/GlobalStyle/GlobalStyle";

import "./assets/css/reset.css";

export default function App() {

    return (
            <BrowserRouter>
            <GlobalStyle />
                <Routes>
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
    );
}