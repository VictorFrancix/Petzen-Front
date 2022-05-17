import styled from "styled-components";
// eslint-disable-next-line
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";
import Order from "./Order";
import UserContext from "../contexts/UserContext";
import ProfileInfo from "./ProfileInfo";

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
                const user = await axios.get(
                    "https://projeto14-petzen-back.herokuapp.com/users",
                    config
                );
                //const user = await axios.get(
                //    "http://localhost:5000/users",
                //    config
                //);
                const orders = await axios.get(
                    "https://projeto14-petzen-back.herokuapp.com/sales",
                    config
                );
                //const orders = await axios.get(
                //    "http://localhost:5000/sales",
                //    config
                //);
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

    function checkLastOrder() {
        for (const property in profile.lastOrder) {
            return true;
        }
        return false;
    }

    function editProfile() {
        const config = {
            headers: { Authorization: `Bearer ${TOKEN}` },
        };
        let password = prompt("Insira sua senha");
        if (password === "" || password === null) return;
        newUser.password = password;

        const promise = axios.put(
            "https://projeto14-petzen-back.herokuapp.com/users",
            newUser,
            config
        );
        //const promise = axios.put(
        //    "http://localhost:5000/users",
        //    newUser,
        //    config
        //);
        promise.then(() => {
            window.location.reload(false);
        });
        promise.catch((err) => {
            if (err.response.status === 401) {
                alert("Senha inválida!");
            } else if (err.response.status === 422) {
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
                <div className="loading">
                    <Loading color = "orange" />
                </div>
            ) : (
                <>
                    <h2>Meu perfil</h2>
                    <ProfileInfo
                        newUser={newUser}
                        setNewUser={setNewUser}
                        profile={profile}
                    />
                    {newUser.change.name ||
                        newUser.change.email ||
                        newUser.change.password ? (
                        <button onClick={editProfile}>Atualizar perfil</button>
                    ) : (
                        <></>
                    )}

                    <div>
                        <p>
                            <span>Último pedido:</span>
                        </p>
                        {checkLastOrder() ? (<>
                            <Order order={profile.lastOrder} />

                        <button
                            onClick={() => {
                                navigate("/orders");
                            }}
                        >
                            Ver todos os pedidos
                        </button>
                        </>) :(<>
                        <p>Você ainda não fez nenhuma compra!</p>
                        </>)}
                        
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

    & > div > p span {
        font-weight: 700;
        font-size: 20px;
    }

    & > div {
        margin-top: 15px;
    }

    & > div > p {
        line-height: 34px;
    }

    & > button,
    & > div > button {
        background-color: var(--purple);
        border: none;
        color: #ffffff;
        height: 35px;
        width: 150px;
        border-radius: 15px;
        font-size: 16px;
    }

    & > div > button {
        width: 200px;
    }

    .loading {
        width: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        left: 50%;
        top: 40%;
    }
`;
