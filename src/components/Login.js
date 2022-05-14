import axios from "axios";
import { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Loading from "./Loading";
import UserContext from "./contexts/UserContext";

export default function Login() {
    const {Error} = useContext(UserContext);
    const [user, setUser] = useState({email: "", password: ""
});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    
    function enableButton(){
        if(user.email.length > 0 && user.password.length > 0){
            return false;
        }
        return true;
    }

    function requestAcess(userObj) {
        setLoading(true);
        const promise = axios.post("https://projeto14-petzen-back.herokuapp.com/login", userObj);
        promise.then((res)=>{
            const token = res.data;
            localStorage.setItem("TOKEN", token);
            console.log(token);
            navigate("/home");
            setLoading(false);
        });
        promise.catch((err) => {
            Error(err);
            navigate("/login");
            setLoading(false);
            
        });
    }

    function sendInputData(e){
        e.preventDefault();
        requestAcess(user)
    }

    return (
        <MainStyle>
            { loading ? <Loading/> : 
            <>
            <h1>PetZen</h1>
                <form
                onSubmit={(e) => sendInputData(e)}
                >
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={user.email}
                        disabled={loading}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={user.password}
                        disabled={loading}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        required
                    />
                    <button disabled= {() => enableButton()}type="submit">
                        Entrar
                    </button>
                </form>

                <Link to="/signup">Primeira Vez? Cadastre-se</Link>
            </>
}
        </MainStyle>
    );
}

const MainStyle = styled.main`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color:  #fa9a39;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Saira Stencil One", cursive;
    h1 {
        font-height: bold;
        color: #ffffff;
        font-size: 32px;
        line-height: 50px;
        margin: -5px 0px 24px;
    }

    h2 {
        font-height: bold;
        color: #ffffff;
        font-size: 25px;
        line-height: 50px;
        margin: -5px 0px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    button {
        font-family: "Saira Stencil One", cursive;
        background-color: #c747fc;
        border: none;
        width: 31%;
        height: 54px;
        color: #ffffff;
        font-weight: 700;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
    }

    button:hover{
        cursor: pointer;
    }

    button:disabled{
        background-color: #a09da1;
        color: #ffffff00;
    }

    input{
        width: 60%;
        max-width: 470px;
        height: 58px;
        padding: 18px 15px;
        border-radius: 30px;
        border: none;
        color: #000000;
        font-size: 12 px;
        margin-bottom: 13px;
    }

    a {
        color: #FFFFFF;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
    }
`;