import styled from "styled-components";

import orange_kitty from './../assets/images/orange_kitty.gif';
import white_kitty from './../assets/images/white_kitty.gif';

export default function Loading({color}) {
    if(color === "orange"){
        return (
            <Div>
                <img className='loadingImage' src={white_kitty} alt="loading" />
                <h2 className='loadingTitle'>Carregando...</h2>
            </Div>)}
    else{
        return (
        <Div>
            <img className='loadingImage' src={orange_kitty} alt="loading" />
            <span className='loadingTitle'>Carregando...</span>
        </Div>
        )}
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .loadingImage{
        width: 100%;
    }

    .loadingTitle{
        font-size: 100%;
        font-weight: bold;
    }
    ` 