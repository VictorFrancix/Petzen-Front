import kitty from './../assets/kitty.gif';

export default function Loading() {
    return (
        <>
            <img src={kitty} alt="loading" />
            <h2>Carregando...</h2>
        </>
    );
}
