import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "./../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";

export default function Menu() {

    const [sidebar, setSidebar] = useState(false);

    const { user } = useContext(UserContext);

    function checkUserLoggedIn(user) {
        for (const property in user) {
            return true;
        }
        return false;
    }

    function renderOptions() {
        return checkUserLoggedIn(user) ? (
            <ul>
                <li onClick={() => goTo("products")}>
                    <div className="options-icon">
                        <ion-icon name="paw"></ion-icon>
                    </div>
                    <p>Produtos</p>
                </li>
                <li onClick={() => goTo("cart")}>
                    <div className="options-icon" >
                        <ion-icon name="cart"></ion-icon>
                    </div>
                    <p>Carrinho</p>
                </li>
                <li onClick={() => goTo("orders")}>
                    <div className="options-icon" >
                        <ion-icon name="bag-check"></ion-icon>
                    </div>
                    <p>Pedidos</p>
                </li>
                <li>
                    <div className="options-icon">
                        <ion-icon name="exit"></ion-icon>
                    </div>
                    <p>Sair</p>
                </li>
            </ul>
        ) : (
            <ul>
                <li onClick={() => goTo("login")}>
                    <div className="options-icon" >
                        <ion-icon name="log-in"></ion-icon>
                    </div>
                    <p>Login</p>
                </li>
                <li onClick={() => goTo("signup")}>
                    <div className="options-icon" >
                        <ion-icon name="person-add"></ion-icon>
                    </div>
                    <p>Cadastro</p>
                </li>
                <li onClick={() => goTo("products")}>
                    <div className="options-icon">
                        <ion-icon name="paw"></ion-icon>
                    </div>
                    <p>Produtos</p>
                </li>
            </ul>
        );
    }


    const showSidebar = () => setSidebar(!sidebar);

    let navigate = useNavigate();
    function goTo(page) {
        navigate(`/${page}`);
    }

    function renderSidebar() {
        return sidebar ? (
            <div className="container-sidebar">
                <div className="close-icon" onClick={showSidebar}>
                    <ion-icon name="close"></ion-icon>
                </div>
                {renderOptions()}
            </div>
        ) : null;
    }


    return (
        <Div>
            <div className="menu-icon" onClick={showSidebar}>
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            {renderSidebar()}
        </Div>
    );
}

const Div = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: lightgray;
    padding: 10px;
    box-shadow: 0 0 10px 0;
    z-index: 2;

    .menu-icon ion-icon {
        font-size: 32px;
        cursor: pointer;
    }

    .container-sidebar {
        background-color: gray;
        position: fixed;
        height: 100%;
        top: 0px;
        left: 0px;
        width: 230px;
        padding: 20px;
        animation: showSidebar 0.4s;
    }

    @keyframes showSidebar {
        from { 
            opacity: 0;
            width: 0;
        }
        to {
            opacity: 1;
            width: 230px;
        }
    }

    .close-icon {
        font-size: 32px;
        cursor: pointer;
    }

    li {
        display: flex;
        justify-content: left;
        align-items: center;
        opacity: 0.6;
    }

    li:hover {
        opacity: 1;
    }

    .options-icon ion-icon {
        font-size: 20px;
    }

    li p {
        font-size: 18px;
        margin: 10px 0 10px 10px;
    }

`;