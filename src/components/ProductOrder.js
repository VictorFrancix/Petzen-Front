import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "./../contexts/UserContext";

export default function ProductOrder({ product, showDetails }) {
    const [productInfo, setProductInfo] = useState([]);
    const { Error } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(
            `https://projeto14-petzen-back.herokuapp.com/products/${product.product}`
        );
        //const promise = axios.get(
        //    `http://localhost:5000/products/${product.product}`
        //);
        promise.then((res) => {
            setProductInfo(res.data);
        });
        promise.catch((err) => {
            Error(err);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Details>
            {showDetails ? (
                <>
                    <img src={productInfo.image} alt={productInfo.name} />
                    <div>
                        <p>{productInfo.name}</p>
                        <p className="quantity">
                            {product.quantity} unidade{product.quantity > 1 ? "s" : ""}
                        </p>
                    </div>
                </>
            ) : (
                <div className="product-title">
                    <p>{productInfo.name}</p>
                </div>
            )}

        </Details>
    );
}

const Details = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 15px 0 15px;
    width: 100%;
    margin-bottom: 15px;

    img {
        width: 60px;
        margin-right: 25px;
        border-radius: 7px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
    }

    p {
        font-size: 16px;
        line-height: 20px;
    }

    & > p {
        line-height: 16px;
    }

    .product-title {
        width: 100%;
        background-color: #E1BEE7;
        padding: 6px 6px 6px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .product-title > p {
        font-weight: 400;
        font-size: 15px;
    }

    .quantity {
        margin-top: 5px;
        font-weight: 300;
    }
`;
