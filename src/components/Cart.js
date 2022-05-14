import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CartProduct from "./CartProduct";
import AddressForm from "./AddressForm";
import UserContext from "./../contexts/UserContext";

export default function Cart() {
    const [paymentMethod, setPaymentMethod] = useState("money");
    const [address, setAddress] = useState({
        CEP: "",
        city: "",
        UF: "AC",
        street: "",
        district: "",
        number: "",
    });
    const [buttonState, setButtonState] = useState(true);
    const { user, setUser, Error } = useContext(UserContext);

    const TOKEN = localStorage.getItem("TOKEN");

    const cart = user.cart;
    let total = user.total;
    // const cart = [
    //     {
    //         idProduct: "ifiweewef",
    //         quantity: 1,
    //     },
    //     {
    //         idProduct: "ifiweewef",
    //         quantity: 1,
    //     },
    // ];
    // const cart = [];

    const navigate = useNavigate();

    function sendSale(e) {
        console.log("Compra finalizada");
        e.preventDefault();
        total += 5;
        const sale = {
            products: cart,
            total,
            paymentMethod,
            idUser: user._id,
            address,
            time: Date.now(),
        };

        const config = {
            headers: { Authorization: `Bearer ${TOKEN}` },
        };

        const promise = axios.post(
            "https://projeto14-petzen-back.herokuapp.com/sales",
            sale,
            config
        );
        promise.then((res) => {
            setUser({ ...user, total: 0, cart: [] });
            navigate(`/orders`);
        });
        promise.catch((err) => {
            Error(err);
        });
    }

    return (
        <Main>
            <h2>Carrinho</h2>
            {cart.length > 0 ? (
                <div>
                    <table>
                        <tr>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Preço Unit</th>
                            <th>Preço Total</th>
                        </tr>
                        {cart.map((product, index) => (
                            <CartProduct
                                selectedProduct={product}
                                key={index}
                            />
                        ))}
                    </table>
                    <p>
                        <span>Frete: </span>R$ 5.00
                    </p>
                    <p>
                        <span>Total: </span>R$ {(total + 5).toFixed(2)}
                    </p>
                    <section>
                        <form onSubmit={(e) => sendSale(e)}>
                            <label htmlFor="paymentMethod">
                                Método de pagamento:{" "}
                            </label>
                            <select
                                className="paymentMethod"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <option value="money">Dinheiro</option>
                                <option value="credit">
                                    Cartão de crédito
                                </option>
                                <option value="debit">Cartão de débito</option>
                            </select>
                            <p>Endereço de entrega:</p>
                            <AddressForm
                                address={address}
                                setAddress={setAddress}
                                setButtonState={setButtonState}
                            />
                            <button type="submit" disabled={buttonState}>
                                Finalizar compra
                            </button>
                        </form>
                    </section>
                </div>
            ) : (
                <div className="empty">
                    <p>Você não adicionou nenhum produto ao seu carrinho!</p>
                </div>
            )}
            <button>Continuar comprando</button>{" "}
            {/*Voltar para tela de produto */}
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    h2 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 15px;
        line-height: 90px;
    }

    div {
        width: 100%;
    }

    .empty p {
        width: 100%;
        text-align: center;
        margin-bottom: 40px;
        font-weight: 700;
        font-size: 20px;
    }

    table {
        width: 100%;
        margin-bottom: 10px;
    }

    tr:first-child {
        height: 20px;
    }

    tr {
        height: 115px;
        border: solid 1px;
    }

    th {
        text-align: center;
        font-weight: 700;
        padding: 5px;
    }

    div > p {
        width: 95%;
        text-align: end;
    }
    div > p span {
        font-weight: 700;
    }

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    section form {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    section form select {
        margin: 10px 0 20px;
        font-size: 16px;
        height: 30px;
        border-radius: 5px;
        background-color: #ffffff;
        padding: 5px;
    }

    .paymentMethod {
        width: 160px;
    }

    section form label,
    section form p {
        font-size: 18px;
        line-height: 25px;
    }

    button {
        width: 225px;
        height: 45px;
        border-radius: 5px;
        border: none;
        background-color: var(--purple);
        margin-bottom: 12px;
        font-size: 16px;
        color: #ffffff;
    }
`;
