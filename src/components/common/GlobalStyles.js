import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;    
    }
    html {
      background-color: #151515;

      &::-webkit-scrollbar {
        width: 0.25rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: white;
      }

      &::-webkit-scrollbar-track {
        background-color: #151515;
      }
    }

      input {
        border: none;
        outline: none;
        padding: 1rem;
        color: white;
      }

      h1, h2, h3, h4, h5, h6, p {
        color: white
      }

      h1 {
        font-size: 4.3rem;
        line-height: 1.1;
      }

      h6 {
        font-size: 14px;
        color: #727272;
        font-weight: 400;
      }

      a {
        text-decoration: none;
        color: white;
        transition: ease all 0.25s;

        &:hover:not(.no-hover) {
          color: #757575
        }
        
      }
      button{
        padding: 0.1rem;
      }
    
    
    
`;

export default GlobalStyles;
