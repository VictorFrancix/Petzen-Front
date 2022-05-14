import "./assets/css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


import TestPage from "./components/TestPage.js";
import Login from "./components/Login";
import SignUp from "./components/Sign-Up";
import UserContext from "./contexts/UserContext";


export default function App() {

    const [user, setUser] = useState({});

    function Error(e) {
        console.log(`${e.response.status} - ${e.response.statusText}`);
        alert("Um erro aconteceu, tente novamente");
      }

    return (
        <Div>
            <UserContext.Provider value={ {
                user, 
                setUser , 
                Error}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/test" element={<TestPage />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
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