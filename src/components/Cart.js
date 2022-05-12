import styled from "styled-components";
import { useState } from "react";

import CartProduct from "./CartProduct";

export default function Cart() {
    const [paymentMethod, setPaymentMethod] = useState("money");
    const [adress, setAdress] = useState("");
    const cart = [
        {
            idProduct: "ifiweewef",
            quantity: 1,
        },
    ];

    let total = 19.9;

    function sendSale(e) {
        e.preventDefault();
        total += 5;
        console.log("Venda enviada");
        const sale = {
            products: cart,
            total,
            paymentMethod,
            time: Date.now(),
        };
        console.log(sale);
    }

    return (
        <Main>
            <h2>Carrinho</h2>
            <table>
                <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço Unit</th>
                    <th>Preço Total</th>
                </tr>
                {cart.map((product, index) => (
                    <CartProduct selectedProduct={product} key={index} />
                ))}
            </table>
            <p>
                <span>Frete: </span>R$ 5.00
            </p>
            <p>
                <span>Total: </span>R$ {total + 5}
            </p>
            <section>
                <form onSubmit={(e) => sendSale(e)}>
                    <label htmlFor="paymentMethod">Método de pagamento: </label>
                    <select
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="money">Dinheiro</option>
                        <option value="credit">Cartão de crédito</option>
                        <option value="debit">Cartão de débito</option>
                    </select>
                    <textarea
                        placeholder="Endereço de entrega"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        required
                    />
                <button type='submit'>Finalizar compra</button>

                </form>
            </section>
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
        font-size: 20px;
        margin-bottom: 15px;
    }

    table {
        width: 100%;
    }

    th {
        text-align: center;
        font-weight: 700;
    }

    & > p {
        width: 90%;
        text-align: end;
    }
    & > p span {
        font-weight: 700;
    }

    section {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 85%;
    }

    section form{
        margin-bottom: 15px;
    }

    section textarea{
        width: 275px;
    }
`;
