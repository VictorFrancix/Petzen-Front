import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.js";
import Loading from "./Loading.js";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        request();
        // eslint-disable-next-line
    }, []);

    async function request() {
        try {
            const response = await axios.get("https://projeto14-petzen-back.herokuapp.com/products");
            //const response = await axios.get("http://localhost:5000/products");
            setProducts(response.data);

        } catch (e) {
            window.alert("Erro na obtenção dos dados.");
            console.log(e);
        }
    }

    return products.length > 0 ? (
        <Div>
            {
                products.map(product => {
                    const { _id } = product;

                    return (
                        <ProductCard
                            key={_id}
                            product={product}
                        />
                    );
                })
            }
        </Div>
    ) : (
        <Div>
            <div className="loading-container">
                <Loading />
            </div>
        </Div>
    )
}

const Div = styled.div`
    background-color: #fa9a39;
    height: 100%;
    width: 100vw;
    padding: 70px 20px 20px 20px;
    overflow-y: scroll;
    
    .loading-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }
`;