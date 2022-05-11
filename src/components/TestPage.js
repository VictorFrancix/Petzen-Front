import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function TestPage(){

    const [text, setText] = useState("");
    const [textFromDatabase, setTextFromDatabase] = useState("");

    async function sendText(event){
        event.preventDefault();
        try {
            const response = await axios.post("https://projeto14-petzen-back.herokuapp.com/test", { text });
            //const response = await axios.post("http://localhost:5000/test", { text });

            const newTextFromDatabase = response.data;
            setTextFromDatabase(newTextFromDatabase);
            
        } catch(e) {
            window.alert("Erro.");
            console.log(e);
        }
    }

    function checkTexts(){
        return (text === textFromDatabase) ? (
            <p class="success">Tudo OK!</p>
        ) : (
            <p class="error">Erro no processo.</p>
        );
    }

    return(
        <Div>
            <h1>Página teste</h1>
            <p>Digite abaixo o texto para enviar ao banco de dados:</p>
            <form onSubmit={sendText}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Texto" required />
                <button type="submit">Salvar entrada</button>
            </form>
            <p>Texto obtido do banco de dados:</p>
            <p>{textFromDatabase}</p>
            {checkTexts()}
        </Div>
    );
}

const Div = styled.div`
    max-width: 375px; /*Iphone 8*/
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 25px 25px 0 25px;
    
    .succes {
        color: green;
    }

    .error {
        color: red;
    }
`;