import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";



import TestPage from "./components/TestPage.js";
import Login from "./components/Login";
import SignUp from "./components/Sign-Up";
import Menu from "./components/Menu.js";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ProductsPage from "./components/ProductsPage.js";
import GlobalStyle from "./assets/GlobalStyle/GlobalStyle";
import UserContext from "./contexts/UserContext";


export default function App() {
    const [user, setUser] = useState({});

    function Error(e) {
        console.log(`${e.response.status} - ${e.response.statusText}`);
        alert("Um erro aconteceu, tente novamente");
    }

    return (
        <Div>
            <UserContext.Provider value={{
                user,
                setUser,
                Error
            }}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Menu />
                    <Routes>
                        <Route path="/test" element={<TestPage />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<ProductsPage />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </Div>
    )
}

const Div = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    * {
        font-family: "Roboto", sans-serif;
        box-sizing: border-box;
    }
`;
