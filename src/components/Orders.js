import axios from "axios";
import { useState, useEffect } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const idUser = "ovihfvwfiweuf";

    useEffect(() => {
        const promise = axios.get(`http://localhost:5000/sales/${idUser}`);
        promise.then((res) => {
            setOrders(res.data);
            console.log(res.data);
        });
        promise.catch((err) => {
            console.log(`${err.response.status} - ${err.response.statusText}`);
            alert("Um erro aconteceu, tente novamente!");
        });
    }, []);

    return (
        <>
            <h2>Meus pedidos</h2>
            {orders.length > 0 ? (
                <p>Seus pedidos estão no console!</p>
            ) : (
                <p>Você não tem nenhum pedido</p>
            )}
        </>
    );
}
