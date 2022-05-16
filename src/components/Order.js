import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

import ProductOrder from "./ProductOrder";

export default function Order({ order }) {
    const [showDetails, setShowDetails] = useState(false);

    let percent;

    if (order.status === "Aceito") {
        percent = 0;
    } else if (order.status === "A caminho") {
        percent = 50;
    } else if (order.status === "Entregue") {
        percent = 100;
    }

    let paymentMethod_ptbr;

    if (order.paymentMethod === "money") {
        paymentMethod_ptbr = "Dinheiro";
    } else if (order.paymentMethod === "debit") {
        paymentMethod_ptbr = "Cartão de Débito";
    } else if (order.paymentMethod === "credit") {
        paymentMethod_ptbr = "Cartão de Crédito";
    }

    const steps = ["Aceito", "A caminho", "Entregue"];

    return order.products.length > 0 ? (
        <Section color={order.status === "Entregue" ? "#d6d4d0" : "lightgoldenrodyellow"}>
            <div className="title">
                <h4>Pedido: {order._id}</h4>
                <p>Data: {dayjs(order.time).format("DD/MM/YY")}</p>
            </div>
            {showDetails ? (
                <div className="details">
                    {order.products.map((product) => {
                        return (
                            <ProductOrder
                                showDetails={showDetails}
                                product={product}
                                key={product._id}
                            />
                        );
                    })}
                    <div className="address">
                        <p>Endereço de entrega:</p>
                        <p>
                            {order.address.street}, {order.address.number} -{" "}
                            {order.address.district}
                        </p>
                        <p>
                            {order.address.city}/{order.address.UF}
                        </p>
                        <p>CEP: {order.address.CEP}</p>
                    </div>
                    <p className="total">
                        <span>Total: </span>R$ {order.total.toFixed(2)}
                    </p>
                    <p><span>Pagamento: </span>{paymentMethod_ptbr}</p>
                    <ProgressBar percent={percent}>
                        {steps.map((step) => {
                            return (
                                <Step>
                                    {({ accomplished, index }) => (
                                        <div
                                            className={`indexedStep ${accomplished
                                                ? "accomplished"
                                                : null
                                                }`}
                                        >
                                            <div className="step"></div>
                                            <p>{step}</p>
                                        </div>
                                    )}
                                </Step>
                            );
                        })}
                    </ProgressBar>
                </div>
            ) : (
                <div>
                    {order.products.map((product) => {
                        return (
                            <ProductOrder
                                showDetails={showDetails}
                                product={product}
                                key={product._id}
                            />
                        );
                    })}
                    <div className="total-status-container">
                        <p className="total-status">
                            <span>Total: </span>R$ {order.total.toFixed(2)}
                        </p>
                        <p className="total-status">
                            <span>Status: </span>
                            {order.status}
                        </p>
                    </div>
                </div>
            )}
            <div className="button-details">
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Esconder" : "Ver"} detalhes do pedido
                </button>
            </div>
        </Section>
    ) : (
        <p>Pedido vazio!</p>
    );
}

const Section = styled.section`
    margin-bottom: 20px;
    background-color: ${props => props.color};
    padding: 12px;
    border-radius: 7px;
    word-break: break-word;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);


    div.title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    div.title h4 {
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.02em;
        font-weight: 500;
        color: #293845;
        margin-bottom: 10px;
    }

    div.title > p {
        font-size: 15px;
        font-weight: 300;
    }

    div.details div.address {
        min-height: 110px;
        width: 400px;
        word-break: break-word;
    }

    div.details div.address p:first-child {
        font-weight: 700;
        font-size: 18px;
    }

    div.details div.address p {
        line-height: 25px;
    }

    .RSPBprogressBar {
        width: 85%;
        margin: 15px 15px 24px;
        height: 5px;
        background-color: #FFFFFF;
        word-break: keep-all;
    }

    .indexedStep {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .step {
        background-color: #FFFFFF;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-top: 12px;
    }

    .accomplished .step {
        background-color: #40cd28;
    }

    .RSPBprogressBar .RSPBprogression {
        background-color: #40cd28;
    }

    & > div {
        display: flex;
        flex-wrap: wrap;
    }

    p span {
        font-weight: 700;
    }

    p.total-status {
        width: 120px;
        margin-top: 15px;
    }

    .total-status-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        margin-top: 8px;
    }

    .button-details {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .button-details button {
        color: darkviolet;
    }
`;
