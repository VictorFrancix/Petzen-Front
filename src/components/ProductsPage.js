import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("TOKEN");

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        request(config);
        // eslint-disable-next-line
    },[]);

    async function request(config){
        try {
            const response = await axios.get("https://projeto14-petzen-back.herokuapp.com/products", config);
            setProducts(response.data);

        } catch(e) {
            window.alert("Erro na obtenção dos dados.");
            console.log(e);
        }
    }

    return products.length > 0 ? (
        <Div>
            <p>TESTE</p>
        </Div>
    ) : (
        <Div>
            <p>Carregando...</p>
        </Div>
    )
}

const Div = styled.div`
    background-color: #fa9a39;
    height: 100vh;
    width: 100vw;
    padding: 70px 15px 15px 20px;
`;