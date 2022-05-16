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
    const { Error } = useContext(UserContext);

    const TOKEN = localStorage.getItem("TOKEN");
    let user = JSON.parse(localStorage.getItem("USER"));

    const cart = user.cart;
    let total = user.total;
    
    const navigate = useNavigate();

    function sendSale(e) {
        e.preventDefault();
        total += 5;
        const sale = {
            products: cart,
            total,
            paymentMethod,
            address,
            time: Date.now()
        };

        const config = {
            headers: { Authorization: `Bearer ${TOKEN}` },
        };

        // const promise = axios.post(
        //     "https://projeto14-petzen-back.herokuapp.com/sales",
        //     sale,
        //     config
        // );

        const promise = axios.post(
            "http://localhost:5000/sales",
            sale,
            config
        );
        promise.then((res) => {
            user = {...user, cart: [], total: 0};
            localStorage.setItem("USER", JSON.stringify(user));
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
                        {cart.map((product, index) => {
                            console.log("product: ", product);
                            return (
                            <CartProduct
                                selectedProduct={product}
                                key={index}
                            />
                        )})}
                    </table>
                    <p>
                        <span>Frete: </span>R$ 5.00
                    </p>
                    <p>
                        <span>Total: </span>R$ {(total + 5).toFixed(2)}
                    </p>
                    <section>
                        <form onSubmit={(e) => sendSale(e)}>
                            <label className="payment-method-header" htmlFor="paymentMethod">
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
                            <p className="adress">Endereço de entrega:</p>
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
            <button onClick={() => navigate('/products')}>Continuar comprando</button>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;

    h2 {
        font-size: 25px;
        line-height: 20px;
        font-weight: 500;
        margin: 50px 0 15px 0;
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
        border: solid 2px;
        background-color: lightgoldenrodyellow;
    }

    th {
        text-align: center;
        font-weight: 700;
        padding: 5px;
    }

    div > p {
        width: 95%;
        text-align: end;
        margin-bottom: 10px;

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
        width: 100%;
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
        border: 1px solid;
        background-color: #BA68C8;
        margin-bottom: 12px;
        font-size: 16px;
        
    }

    .adress {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: lightgoldenrodyellow;
        padding: 8px;
        border-radius: 5px 5px 0 0;
        border: 1px solid;
    }

    .payment-method-header {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: lightgoldenrodyellow;
        padding: 8px;
        border-radius: 5px 5px 0 0;
        border: 1px solid;
    }
`;
