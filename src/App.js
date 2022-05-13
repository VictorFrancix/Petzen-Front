import "./assets/css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TestPage from "./components/TestPage.js";
import Menu from "./components/Menu.js";
import UserContext from "./contexts/UserContext.js";

export default function App() {

    const [user, setUser] = useState({});

    return (
        <Div>
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route path="/test" element={<TestPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </Div >
    );
}

const Div = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    
    * {
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }
`;