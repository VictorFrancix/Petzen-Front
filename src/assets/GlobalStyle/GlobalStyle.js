import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        /*font-family: ?;*/
        box-sizing: border-box;
    }

    button:hover{
        cursor: pointer;
    }

    select:hover{
        cursor: pointer;
    }
`;

export default GlobalStyles;
