import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "./../contexts/UserContext";

export default function CartProduct({ selectedProduct, index }) {
    const [product, setProduct] = useState({});
    const { Error } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(
            `https://projeto14-petzen-back.herokuapp.com/products/${selectedProduct.product}`
        );
        promise.then((res) => {
            setProduct({
                ...res.data,
                price: parseFloat(res.data.price.$numberDecimal),
            });
        });
        promise.catch((err) => {
            Error(err);
        });
        // eslint-disable-next-line
    }, []);

    function removeProduct() {
        if (window.confirm("Deseja remover esse produto do seu carrinho?")) {
            let user = JSON.parse(localStorage.getItem("USER"));
            const cart = user.cart;
            cart.splice(index, 1);
            console.log(user);
            localStorage.setItem("USER", JSON.stringify(user));
            document.location.reload();
        }
    }

    return (
        <Row>
            {product.price ? (
                <>
                    <td>
                        <img src={product.image} alt={product.name} />
                        {product.name}
                    </td>
                    <td>{selectedProduct.quantity}</td>
                    <td>R$ {product.price.toFixed(2)}</td>
                    <td>
                        R${" "}
                        {(product.price * selectedProduct.quantity).toFixed(2)}
                    </td>
                    <div className="trash">
                        <ion-icon
                            name="trash-outline"
                            onClick={removeProduct}
                        ></ion-icon>

                    </div>
                </>
            ) : (
                <></>
            )}
        </Row>
    );
}

const Row = styled.tr`
    position: relative;

    img {
        max-width: 100px;
        width: auto;
        border-radius: 5px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        margin: 10px 5px 10px 5px;
    }

    td {
        vertical-align: middle;
        text-align: center;
        padding: 5px;
    }

    td:first-child {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        min-height: 115px;
    }

    .trash{
        position: absolute;
    bottom: 8px;
    right: 8px;
    width: fit-content;
    font-size: 20px;
    }
`;
