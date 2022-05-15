import kitty from './../assets/images/kitty.gif';

export default function Loading() {
    return (
        <>
            <img src={kitty} alt="loading" />
            <h2>Carregando...</h2>
        </>
    );
}
