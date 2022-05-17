import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "./Loading";

export default function Slider(){
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);

     useEffect(() => {
         requestSlides();
         // eslint-disable-next-line
     }, []);

     function requestSlides() {
         setLoading(true);
         const promise = axios.get("https://projeto14-petzen-back.herokuapp.com/products");
         promise.then((res) => {
             setSlides(res.data);
             setLoading(false);
             console.log(res.data)
             slides.sort(() => Math.random() - 0.5); 
         });
         promise.catch((err) => {
             console.log(err);
            setLoading(false);
         });
        
    }

    return(
        <>
            {loading ? (
                <Loading color={"white"}/>
            ) : ( slides.length > 0 ?(
                <Div>
                    <div className="slider">
                        <Link to={`/products/${slides[0]._id}`}>
                            <img src={slides[0].image} alt="slide" />
                        </Link>    
                        <Link to={`/products/${slides[1]._id}`}>
                            <img src={slides[1].image} alt="slide" />
                        </Link>  
                        <Link to={`/products/${slides[2]._id}`}>
                            <img src={slides[2].image} alt="slide" />
                        </Link>  
                        <Link to={`/products/${slides[3]._id}`}>
                            <img src={slides[3].image} alt="slide" />
                        </Link>  
                        <Link to={`/products/${slides[0]._id}`}>
                            <img src={slides[0].image} alt="slide" />
                        </Link>            
                    </div>
                </Div>) : <> </>
                )}
        </>
    )
};

const Div = styled.div`
    width: 32%;
    height: auto;
    overflow: hidden;
    border-radius: 30px;
    


    .slider {
    width: 502%;
    animation-name: animacao;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    border-radius: 30px;
}

    .slider img {
    width: 19.99%;
    border-radius: 30px;
    object-fit: cover;

    
}



    @keyframes animacao {
    0% { margin-left: 0; }
    20% { margin-left: 0; }
    25% { margin-left: -100%; }
    45% { margin-left: -100%; }
    50% { margin-left: -200%; }
    70% { margin-left: -200%; }
    75% { margin-left: -300%; }
    95% { margin-left: -300%; }
    100% { margin-left: -400%; }
}

`;
