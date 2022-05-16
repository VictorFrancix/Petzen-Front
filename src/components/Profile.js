import styled from "styled-components";
// eslint-disable-next-line
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";
import Order from "./Order";
import UserContext from "./../contexts/UserContext";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        change: {
            name: false,
            email: false,
            password: false,
        },
        new: {},
    });
    const TOKEN = localStorage.getItem("TOKEN");
    const { Error } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            const config = {
                headers: { Authorization: `Bearer ${TOKEN}` },
            };
            try {
                // const user = await axios.get(
                //     "https://projeto14-petzen-back.herokuapp.com/users",
                //     config
                // );
                const user = await axios.get(
                    "http://localhost:5000/users",
                    config
                );
                const orders = await axios.get(
                    "http://localhost:5000/sales",
                    config
                );
                let lastOrder =
                    orders.data.length > 0
                        ? orders.data[orders.data.length - 1]
                        : {};
                setProfile({ ...user.data, lastOrder });
                setNewUser({
                    ...newUser,
                    name: user.data.name,
                    email: user.data.email,
                });
                setLoading(false);
            } catch (err) {
                Error(err);
            }
        }

        getProfile();
    }, []);

    function editProfile() {
        const config = {
            headers: { Authorization: `Bearer ${TOKEN}` },
        };
        let password = prompt("Insira sua senha");
        if (password === "" || password === null) return;
        newUser.password = password;

        // const promise = axios.put(
        //     "https://projeto14-petzen-back.herokuapp.com/users",
        //     newUser,
        //     config
        // );
        const promise = axios.put(
            "http://localhost:5000/users",
            newUser,
            config
        );
        promise.then(() => {
            window.location.reload(false);
        });
        promise.catch((err) => {
            if (err.response.status === 401) {
                alert("Senha inválida!");
            } else if( err.response.status === 422){
                alert("Preencha os dados corretamente!");
            } else {
                Error(err);
            }
            window.location.reload(false);
        });
    }

    return (
        <Main>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h2>Meu perfil</h2>
                    <ul>
                        <li>
                            <p>
                                <span>Nome: </span>
                                {profile.name}
                            </p>
                            {newUser.change.name ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Novo nome"
                                        value={newUser.new.name}
                                        onChange={(e) => {
                                            newUser.new.name = e.target.value;
                                            setNewUser({ ...newUser });
                                        }}
                                    />
                                    <button
                                        className="cancel"
                                        onClick={() => {
                                            newUser.change.name = false;
                                            setNewUser({ ...newUser });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        newUser.change.name = true;
                                        setNewUser({ ...newUser });
                                    }}
                                >
                                    Editar nome
                                </button>
                            )}
                        </li>
                        <li>
                            <p>
                                <span>Email: </span>
                                {profile.email}
                            </p>
                            {newUser.change.email ? (
                                <>
                                    <input
                                        type="email"
                                        placeholder="Novo email"
                                        value={newUser.new.email}
                                        onChange={(e) => {
                                            newUser.new.email = e.target.value;
                                            setNewUser({ ...newUser });
                                        }}
                                    />
                                    <button
                                        className="cancel"
                                        onClick={() => {
                                            newUser.change.email = false;
                                            setNewUser({ ...newUser });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        newUser.change.email = true;
                                        setNewUser({ ...newUser });
                                    }}
                                >
                                    Editar email
                                </button>
                            )}
                        </li>
                        <li>
                            {newUser.change.password ? (
                                <>
                                    <input
                                        type="password"
                                        placeholder="Nova senha"
                                        value={newUser.new.password}
                                        onChange={(e) => {
                                            newUser.new.password =
                                                e.target.value;
                                            setNewUser({ ...newUser });
                                        }}
                                    />
                                    <button
                                        className="cancel"
                                        onClick={() => {
                                            newUser.change.password = false;
                                            setNewUser({ ...newUser });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        newUser.change.password = true;
                                        setNewUser({ ...newUser });
                                    }}
                                >
                                    Editar senha
                                </button>
                            )}
                        </li>
                    </ul>
                    {newUser.change.name || newUser.change.email || newUser.change.password ? (
                        <button onClick={editProfile}>Atualizar perfil</button>
                    ) : (
                        <></>
                    )}

                    <div>
                        <p>
                            <span>Último pedido:</span>
                        </p>
                        <Order order={profile.lastOrder} />

                        <button
                            onClick={() => {
                                navigate("/orders");
                            }}
                        >
                            Ver todos os pedidos
                        </button>
                    </div>
                </>
            )}
        </Main>
    );
}

const Main = styled.main`
    margin-top: 60px;
    padding: 18px;
    height: 100vh;

    h2 {
        font-weight: 700;
        font-size: 25px;
        margin-bottom: 15px;
    }

    li {
        width: 90%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 15px;
        font-size: 18px;
    }

    li p span,
    & > div > p span {
        font-weight: 700;
        font-size: 20px;
    }

    input {
        height: 30px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        font-size: 15px;
        margin-top: 8px;
    }

    li button {
        background: none;
        border: none;
        font-size: 15px;
    }

    li button.cancel {
        background-color: var(--purple);
        color: #ffffff;
        height: 25px;
        border-radius: 10px;
    }

    & > div {
        margin-top: 15px;
    }

    & > div > p {
        line-height: 34px;
    }

    & > button, & > div > button {
    background-color: var(--purple);
    border: none;
    color: #FFFFFF;
    height: 35px;
    width: 150px;
    border-radius: 15px;
    font-size: 16px;
    }

    & > div > button{
        width: 200px;
    }
`;
