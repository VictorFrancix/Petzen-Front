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

`;