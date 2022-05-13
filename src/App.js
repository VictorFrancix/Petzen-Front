import "./assets/css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from "./components/TestPage.js";
import Login from "./components/Login";
import SignUp from "./components/Sign-Up";

export default function App() {

    return (
        <Div>
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<TestPage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                </Routes>
            </BrowserRouter>
        </Div >
    );
}

const Div = styled.div`
    /*background-color: ?;*/
    display: flex;
    justify-content: center;
    align-items: center;
    
    * {
        /*font-family: ?;*/
        box-sizing: border-box;
    }
`;