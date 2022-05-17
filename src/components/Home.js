import styled from "styled-components";

import logo from "./../assets/images/logo.gif"
import adopt from "./../assets/images/adopt.jpg"
import Slider from "./Slider";

export default function Home() {
    return(
        <Main>
            <section className = "LogoContainer">
                <img className = "logo" src={logo} alt="logo"/>
                <h1>Petzen</h1>
            </section>
            <section>
                <article>
                    <h2>Ofertas da Semana:</h2>
                    <Slider/>
                    <p>Os melhores produtos para seu pet você só encontra aqui!</p>
                </article>
                <article>
                    <h2> Adote um amigo!</h2>
                    <img className = "adopt"src = {adopt} alt = "adopt" />
                    <p>Dê um lar a quem precisa...</p>
                </article>
            </section>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;

    .LogoContainer{
        margin-top:5%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: 'Righteous', cursive;
        font-weight: bold;
        color: #ffffff;
        font-size: 500%;
        line-height: 50px;
        margin: -5px 0px 24px;
    }

    .logo{
        width:20%;
    }

    h2{
        font-weight: bold;
        font-size: 200%;
        line-height: 50px;
        margin: 10px 60px; 
    }

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: lightgoldenrodyellow;
        width: 30%;
        border-radius: 20px;
    }

    section {
        margin-top: 5%;
        display: flex;
        justify-content: space-around;
    }
    p {
        margin: 5%;
        font-size: 100%;

    }
    .adopt {
        width: 40%;
        border-radius: 20px;

    }
    @media (max-width: 760px) {
        
        section {
            flex-direction: column;
            align-items: center;
            justify-content: center;
    }
        article{
            margin-bottom: 10%;
            width: 80%;
        }
        .LogoContainer{
            margin-top: 8%;
        }
        .logo {
            width: 50%;
        }
        h1 {
            font-size: 400%;
        }
        h2{
            font-size: 100%;
        }

        p{
            font-size: 80%;
        }

        .adopt{
            margin-top: -3%
        }
`
