import styled from "styled-components";
import { useContext } from "react";
import UserContext from "./../contexts/UserContext.js";

export default function Menu(){

    const { user } = useContext(UserContext);

    function checkUserLoggedIn(user){
        for (const property in user){
            return true;
        }
        return false;
    }

    return checkUserLoggedIn(user) ? (
        <Div>
            <p>usuário logou</p>
        </Div>
    ) : (
        <Div>
            <p>usuário não logou</p>
        </Div>
    );
}

const Div = styled.div`


`;