import styled from "styled-components";

export default function ProfileInfo({ newUser, setNewUser, profile }) {
    return (
        <List>
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
                                newUser.new.password = e.target.value;
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
        </List>
    );
}

const List = styled.ul`
    li {
        width: 90%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 15px;
        font-size: 18px;
    }

    li p span {
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
`;
