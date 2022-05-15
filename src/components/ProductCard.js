import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const { _id, name, image, price, storeName } = props.product;

    const formattedPrice = price.$numberDecimal.replace(".", ",");

    return (
        <Div>
            <img src={image} alt={name} />
            <div className="infos-container">
                <p className="title">{name}</p>
                <div className="price-store-container">
                    <p className="price">R$ {formattedPrice}</p>
                    <p className="store">Loja: {storeName}</p>
                </div>
                <Link to={`/products/${_id}`}>
                    <div className="add-icon">
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Mais informações</p>
                    </div>
                </Link>
            </div>
        </Div>
    );
}

const Div = styled.div`

    background-color: lightgoldenrodyellow;
    border-radius: 5px;
    margin: 10px 0 10px 0;
    padding: 15px 10px 15px 15px;
    display: flex;
    justify-content: left;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
    position: relative;

    img {
        height: 100px;
        width: auto;
        border-radius: 5px;
        margin-right: 15px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.02em;
        font-weight: 500;
        color: #293845;
        margin-bottom: 10px;
    }

    .store {
        font-size: 15px;
        line-height: 20px;
        color: #293845;
    }

    .price-store-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-size: 15px;
        line-height: 20px;
        color: darkmagenta;
    }

    .add-icon {
        font-size: 24px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        color: #293845;
        opacity: 0.7;
    }

    .add-icon p {
        font-size: 15px;
        line-height: 20px;
        margin-left: 5px;
        color: #293845;
    }

    .add-icon:hover {
        opacity: 1;
    }
`;