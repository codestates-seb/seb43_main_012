import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
    --color-bg: #FFFFFF;
    --color-green: green;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
}

a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }

`

export default GlobalStyle;