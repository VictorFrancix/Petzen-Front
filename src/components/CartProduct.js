import styled from "styled-components";

export default function CartProduct({ selectedProduct, total, setTotal }) {
    const product = {
        name: "Ração de gato",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQrPx5oo09BP2cmz1uBNhdb6lGd6yzDCEHg&usqp=CAU",
        description: "Ração de gato muito boa 1 kg",
        price: 19.9,
        id: "ifiweewef",
    };

    total += product.price * selectedProduct.quantity;
    return (
        <Row>
            <td>
                <img src={product.img} alt={product.name} />
                {product.name}
            </td>
            <td>{selectedProduct.quantity}</td>
            <td>R$ {product.price.toFixed(2)}</td>
            <td>R$ {(product.price * selectedProduct.quantity).toFixed(2)}</td>
        </Row>
    );
}

const Row = styled.tr`
    img {
        max-width: 100px;
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
