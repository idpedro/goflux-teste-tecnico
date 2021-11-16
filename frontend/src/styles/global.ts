import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  :root{
  /* Color styles */
  --flux-yellow: #ECAF4A;

  --flux-red-600: #920B2D;
  --flux-purple-900: #221A32;
  --flux-purple-800: #241C36;
  
  --flux-purple-500: #5d5fef;
  --flux-red-500: #EA0029;
  --flux-white: #FFFFFF;
  
  --flux-green-500: #009688;

  --button-red: #EA0029;
  --button-text-red: #fff;

  --button-purple: #5d5fef;
  --button-text-purple: #fff;
  --button-yellow: #ECAF4A;
  --button-text-yellow:  #221A32;
  --button-green:#009688;
  --button-text-green:  #fff;



  --log-bg-success:#009688;
  --log-text-success:#fff;

  --log-bg-info:#5d5fef;
  --log-text-info:#fff;

  --log-bg-error:#920B2D;
  --log-text-error:#fff;

  --log-bg-fatal:#EA0029;
  --log-text-fatal:#fff;

  --log-bg-warning:#ECAF4A;
  --log-text-warning:#fff;


  --font-text: 'Nunito', sans-serif;
    --font-title:'Fjalla One', sans-serif;

  }

  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,body,#root{
    height: 100%;
    width: 100%;
  }

  button,a,input[type='checkbox']{
    cursor: pointer;
  }

  body{
    background-color:var(--flux-purple-900);
    color: var(--flux-white);
    font-family:var(--font-text);
  }

  h1,h2,h3,h4 {
    font-family:var(--font-title);
    letter-spacing: 2px;
  }
  a{
    text-decoration:none;
    font-weight:bolder;
  }

`;
