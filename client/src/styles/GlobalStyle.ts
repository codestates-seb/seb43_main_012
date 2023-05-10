import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    --color-bg: #FFFFFF;
    --color-green: green;

    --size-font-link: 20px;

    --padding-right-topnavitems: 10px;
    --padding-top-topnavitems: 90px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    // margin-top: 30px;
    font-family: 'Scandia', sans-serif;
}

a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }



@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-RegularItalic.eot');
  src: local('Scandia Regular Italic'), local('Scandia-RegularItalic'),
      url('./fonts/Scandia-RegularItalic.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-RegularItalic.woff2') format('woff2'),
      url('./fonts/Scandia-RegularItalic.woff') format('woff'),
      url('./fonts/Scandia-RegularItalic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-Light.eot');
  src: local('Scandia Light'), local('Scandia-Light'),
      url('./fonts/Scandia-Light.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-Light.woff2') format('woff2'),
      url('./fonts/Scandia-Light.woff') format('woff'),
      url('./fonts/Scandia-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-BoldItalic.eot');
  src: local('Scandia Bold Italic'), local('Scandia-BoldItalic'),
      url('./fonts/Scandia-BoldItalic.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-BoldItalic.woff2') format('woff2'),
      url('./fonts/Scandia-BoldItalic.woff') format('woff'),
      url('./fonts/Scandia-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('./fonts/ScandiaLine-Bold.eot');
  src: local('Scandia Line Bold'), local('ScandiaLine-Bold'),
      url('./fonts/ScandiaLine-Bold.eot?#iefix') format('embedded-opentype'),
      url('./fonts/ScandiaLine-Bold.woff2') format('woff2'),
      url('./fonts/ScandiaLine-Bold.woff') format('woff'),
      url('./fonts/ScandiaLine-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('./fonts/ScandiaLine-Light.eot');
  src: local('Scandia Line Light'), local('ScandiaLine-Light'),
      url('./fonts/ScandiaLine-Light.eot?#iefix') format('embedded-opentype'),
      url('./fonts/ScandiaLine-Light.woff2') format('woff2'),
      url('./fonts/ScandiaLine-Light.woff') format('woff'),
      url('./fonts/ScandiaLine-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Stencil';
  src: url('./fonts/Scandia-Stencil.eot');
  src: local('Scandia Stencil'), local('Scandia-Stencil'),
      url('./fonts/Scandia-Stencil.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-Stencil.woff2') format('woff2'),
      url('./fonts/Scandia-Stencil.woff') format('woff'),
      url('./fonts/Scandia-Stencil.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-Medium.eot');
  src: local('Scandia Medium'), local('Scandia-Medium'),
      url('./fonts/Scandia-Medium.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-Medium.woff2') format('woff2'),
      url('./fonts/Scandia-Medium.woff') format('woff'),
      url('./fonts/Scandia-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-LightItalic.eot');
  src: local('Scandia Light Italic'), local('Scandia-LightItalic'),
      url('./fonts/Scandia-LightItalic.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-LightItalic.woff2') format('woff2'),
      url('./fonts/Scandia-LightItalic.woff') format('woff'),
      url('./fonts/Scandia-LightItalic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('./fonts/ScandiaLine-Medium.eot');
  src: local('Scandia Line Medium'), local('ScandiaLine-Medium'),
      url('./fonts/ScandiaLine-Medium.eot?#iefix') format('embedded-opentype'),
      url('./fonts/ScandiaLine-Medium.woff2') format('woff2'),
      url('./fonts/ScandiaLine-Medium.woff') format('woff'),
      url('./fonts/ScandiaLine-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-MediumItalic.eot');
  src: local('Scandia Medium Italic'), local('Scandia-MediumItalic'),
      url('./fonts/Scandia-MediumItalic.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-MediumItalic.woff2') format('woff2'),
      url('./fonts/Scandia-MediumItalic.woff') format('woff'),
      url('./fonts/Scandia-MediumItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line Stencil';
  src: url('./fonts/ScandiaLine-Stencil.eot');
  src: local('Scandia Line Stencil'), local('ScandiaLine-Stencil'),
      url('./fonts/ScandiaLine-Stencil.eot?#iefix') format('embedded-opentype'),
      url('./fonts/ScandiaLine-Stencil.woff2') format('woff2'),
      url('./fonts/ScandiaLine-Stencil.woff') format('woff'),
      url('./fonts/ScandiaLine-Stencil.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('./fonts/ScandiaLine-Regular.eot');
  src: local('Scandia Line Regular'), local('ScandiaLine-Regular'),
      url('./fonts/ScandiaLine-Regular.eot?#iefix') format('embedded-opentype'),
      url('./fonts/ScandiaLine-Regular.woff2') format('woff2'),
      url('./fonts/ScandiaLine-Regular.woff') format('woff'),
      url('./fonts/ScandiaLine-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-Bold.eot');
  src: local('Scandia Bold'), local('Scandia-Bold'),
      url('./fonts/Scandia-Bold.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-Bold.woff2') format('woff2'),
      url('./fonts/Scandia-Bold.woff') format('woff'),
      url('./fonts/Scandia-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('./fonts/Scandia-Regular.eot');
  src: local('Scandia Regular'), local('Scandia-Regular'),
      url('./fonts/Scandia-Regular.eot?#iefix') format('embedded-opentype'),
      url('./fonts/Scandia-Regular.woff2') format('woff2'),
      url('./fonts/Scandia-Regular.woff') format('woff'),
      url('./fonts/Scandia-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}



`;

export default GlobalStyle;
