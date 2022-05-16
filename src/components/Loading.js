import orange_kitty from './../assets/images/orange_kitty.gif';
import white_kitty from './../assets/images/white_kitty.gif';

export default function Loading({color}) {
    if(color === "orange"){
        return (
            <>
                <img src={white_kitty} alt="loading" />
                <h2>Carregando...</h2>
            </>)}
    else{
        return (<>
            <img src={orange_kitty} alt="loading" />
            <h2>Carregando...</h2>
        </>)}
}
