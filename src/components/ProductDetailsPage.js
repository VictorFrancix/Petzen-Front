import styled from "styled-components";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage(){
    const { productId } = useParams();

    return (
        <Div>
            <p>TESTE: {productId}</p>
        </Div>
    );
}

const Div = styled.div`
    background-color: #fa9a39;
    height: 100%;
    width: 100vw;
    padding: 70px 20px 20px 20px;
    overflow-y: scroll;
`;