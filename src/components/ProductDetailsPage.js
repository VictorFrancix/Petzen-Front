import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect, useNavigate } from "react";
import UserContext from "./../contexts/UserContext.js";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const { user, setUser, Error } = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [formatedPrice, setFormatedPrice] = useState("");

    const token = localStorage.getItem("TOKEN");

    useEffect(() => {
        // const promise = axios.get(`https://projeto14-petzen-back.herokuapp.com/products/${productId}`);
        const promise = axios.get(`http://localhost:5000/products/${productId}`);

        promise.then((res) => {
            setProduct(res.data);
            setFormatedPrice(res.data.price.$numberDecimal.replace(".", ","));
        });
        promise.catch((err) => {
            Error(err);
        });
        // eslint-disable-next-line
    }, []);

    function renderButton() {
        return token ? (
            <div className="container-button">
                <button onClick={sendToCart}>
                    <ion-icon name="cart-outline"></ion-icon>
                    <p>Adicionar ao carrinho</p>
                </button>
            </div>
        ) : <></>;
    }

    function sendToCart() {
        let newCart = [];
        if (!user.cart) {
            newCart = [product];
            console.log("newCart: ", newCart);
        }
        else {
            newCart = [...user.cart, product];
            console.log("newCart: ", newCart);
        }

        const newUser = {
            ...user,
            cart: newCart
        }
        console.log("newUser: ", newUser);

        setUser(newUser);

        nextPage();
    }

    const navigate = useNavigate();
    function nextPage(){
        navigate("/cart");
    }


    return (
        <Div>
            <div className="container-details">
                <div className="product-header">
                    <img src={product.image} alt={product.name}></img>
                    <div className="container-title-price">
                        <h1>{product.name}</h1>
                        <p className="price">Preço: R$ {formatedPrice}</p>
                    </div>
                </div>
                {renderButton()}
                <div className="container-description">
                    <p>Descrição</p>
                    <p>{product.description}</p>
                </div>
                <p className="store">Loja: {product.storeName}</p>
            </div>
        </Div>
    );
}

const Div = styled.div`
    background-color: #fa9a39;
    height: 100vh;
    width: 100vw;
    padding: 70px 20px 20px 20px;
    overflow-y: scroll;

    .container-details {
        background-color: lightgoldenrodyellow;
        border-radius: 5px;
        width: 100%;
        margin: 10px 0 10px 0;
        padding: 15px 10px 15px 15px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
    }

    .product-header {
        display: flex;
        justify-content: space-between;
    }

    .container-title-price {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 150px;
    }

    h1 {
        font-size: 18px;
        line-height: 25px;
        font-weight: 500;
        color: #293845;
        margin-bottom: 10px;
        flex-wrap: wrap;
    }

    img {
        height: 150px;
        width: auto;
        margin-right: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    }

    .price {
        color: darkmagenta;
        font-size: 18px;
    }

    .container-button {
        margin: 25px 0 0 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    button {
        padding: 10px;
        display: flex;
        align-items: center;
        border: 2px solid #293845;
        background-color: inherit;
        border-radius: 5px;
        transition: all 0.3s;
    }

    button:hover{
        border: 2px solid #BA68C8;
        transition: all 0.3s;
    }

    button ion-icon {
        font-size: 22px;
        margin-right: 10px;
    }
    
    button p {
        font-size: 15px;
    }

    .container-description p:first-of-type {
        font-weight: 400;
        margin: 25px 2px 10px 0;
        background-color: #BA68C8;
        padding: 8px 8px 8px 15px;
        border-radius: 5px 5px 0 0;
    }

    .container-description p:last-of-type {
        font-weight: 300;
        line-height: 25px;
        margin-left: 15px;
        margin-right: 10px;
        hyphens: auto;
    }

    .store {
        font-weight: 400;
        margin: 10px 2px 10px 0;
        background-color: #BA68C8;
        padding: 8px 8px 8px 15px;
        border-radius: 0 0 5px 5px;
    }

    
`;