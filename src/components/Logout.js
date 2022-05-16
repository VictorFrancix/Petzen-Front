import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import dog_logout from "./../assets/images/dog_logout.png";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";

export default function Logout() {
    const {error} = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    function logout() {
        setLoading(true);
        const promise = axios.post(
            "https://projeto14-petzen-back.herokuapp.com/logout"
        );
        promise.then(() => {
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("NAME");
            navigate("/");
            setLoading(false);
        });
        promise.catch((err) => {
            error(err);
            setLoading(false);
        });
    }

    return (
            <ArticleStyle hidden = {hidden} content = {loading}>
                {loading ? <Loading color={"white"}/> : (
                <>
                    <h1>Você tem certeza ?</h1>                    
                    <img className= {"pic"} src = {dog_logout} alt = "logout" />
                    <div className="Buttons">
                        <button onClick={() => logout()}> Sim </button>
                        <button onClick={() => setHidden(false)}> Não </button>
                    </div>
                </>
                )}
            </ArticleStyle>
    );
};


const ArticleStyle = styled.article`
    display: ${(props) => (!props.hidden ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) => (props.content ? "center" : "space-around")};};
    height: 45vh;
    width: 30vw;
    position: absolute;
    top: 25%;
    left: 35%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #000000;
    background-color: #F5F5F5;
    z-index: 3;
    
    h2 {
        font-size: 100%;
        line-height: 50px;
        margin-bottom: 
    }
    
    h1 {
        font-size: 100%;
        text-align: center;
        margin: 8% 0;
        margin-top: 10% }

    .pic {
        width: 40%;
        margin: -8% auto;
        object-fit: cover;
    }
    .Buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

    button {
        background-color: #FFF;
        border: 1px solid #000;
        border-radius: 10px;
        margin: 10% 0;
        padding: 3%;
        width: 30%;
        font-size: 100%;
        cursor: pointer;
    }

    @media (max-width: 760px) {
        width: 60vw;
        height: 50vh;
        left: 20%;

        img{
            width: 50%;
        }

`;
