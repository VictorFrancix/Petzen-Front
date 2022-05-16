import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "./../contexts/UserContext";

export default function CartProduct({ selectedProduct }) {
    const [product, setProduct] = useState({});
    const { Error } = useContext(UserContext);

    useEffect(() => {
        console.log("selectedProduct: ", selectedProduct);
        const promise = axios.get(
            `https://projeto14-petzen-back.herokuapp.com/products/${selectedProduct.product}`
        );
        promise.then((res) => {
            setProduct({...res.data, price: parseFloat(res.data.price.$numberDecimal)});
        });
        promise.catch((err) => {
            Error(err);
        });
        // eslint-disable-next-line
    }, []);

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
                <td>R$ {(product.price * selectedProduct.quantity).toFixed(2)}</td>
                </>
            ):(<></>)}

        </Row>
    );
}

const Row = styled.tr`
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
`;
