import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {

    --b100: #000;
    --b80: #333;
    --b70: #555;
    --b60: #777;
    --b50: #999;
    --b45: #aaa;
    --b40: #bbb;
    --b30: #e6e6e8;
    --b20: #ececf1;
    --b15: #f2f2f4;
    --b10: #fafafc;
    --b0: #fff;

    --color-error: #913535;
    --color-default-bg: #FFFFFF;
    --color-default-green: #77AD69;
    --color-default-darkgreen: #4E973C;
    --color-default-green-opacity: rgba(119,173,105, 0.9);
    --color-default-yellow: #E7CC8F;
    --color-default-yellow-50: rgba(231, 204, 143, 0.5);
    --color-default-yellow-title: #C9AD6E;
    --color-default-yellow-dark: #E8C169;
    --color-default-lightestgray:  #FAFAFA;
    --color-default-gray: #757575;
    --color-default-inactive: #D9D9D9;
    --color-default-border: #C9C9C9;
    --color-default-disabled: #999;
    --color-default-navtooltip: rgba(119, 173, 105, 1);
    --color-default-avatarbg: rgba(119, 173, 105, 0.6);
    --color-border-dialogbox: rgba(117, 117, 117, 0.5);
    --color-dropshadow-dialogbox: rgba(117, 117, 117, 0.1);
    --color-checked-inactive: #CCCCCC;

    --size-minheight-topnav: 105px;
    --size-minwidth-topnavicons: 500px;
    --size-minwidth-logo: 197px;
    --size-avatar-center: 60px;
    --size-avatar-default: 48px;
    --size-avatar-hover: 54px;
    --size-avatar-center-hover: 70px;
    --size-icon-default: 32px;
    --size-minwidth-pc-main: 700px;
    --size-maxwidth-pc-main: 1080px;

    --text-fontsize-link: 20px;
    --text-fontsize-title: 24px;
    --text-fontsize-logo: 25px;
    --text-fontweight-logo: 500;
    --text-letterspacing-logo: 0.07em;
    --text-fontsize-qinput: 18px;
    --text-fontweight-regular: 400;
    --text-fontweight-medium: 500;

    --padding-top-topnavbox: 14px;
    --padding-left-topnavbox: 32px;
    --padding-left-topnavitems: 10px;
    --padding-right-topnavitems: 10px;
    --padding-top-topnavitems: 90px;

    --cui-blue: #0d6efd;
  --cui-indigo: #6610f2;
  --cui-purple: #6f42c1;
  --cui-pink: #d63384;
  --cui-red: #dc3545;
  --cui-orange: #fd7e14;
  --cui-yellow: #ffc107;
  --cui-green: #198754;
  --cui-teal: #20c997;
  --cui-cyan: #0dcaf0;
  --cui-black: #000015;
  --cui-white: #fff;
  --cui-gray: #8a93a2;
  --cui-gray-dark: #636f83;
  --cui-gray-100: #ebedef;
  --cui-gray-200: #d8dbe0;
  --cui-gray-300: #c4c9d0;
  --cui-gray-400: #b1b7c1;
  --cui-gray-500: #9da5b1;
  --cui-gray-600: #8a93a2;
  --cui-gray-700: #768192;
  --cui-gray-800: #636f83;
  --cui-gray-900: #4f5d73;
  --cui-primary: #321fdb;
  --cui-secondary: #9da5b1;
  --cui-success: #2eb85c;
  --cui-info: #39f;
  --cui-warning: #f9b115;
  --cui-danger: #e55353;
  --cui-light: #ebedef;
  --cui-dark: #4f5d73;
  --cui-primary-rgb: 50, 31, 219;
  --cui-secondary-rgb: 157, 165, 177;
  --cui-success-rgb: 46, 184, 92;
  --cui-info-rgb: 51, 153, 255;
  --cui-warning-rgb: 249, 177, 21;
  --cui-danger-rgb: 229, 83, 83;
  --cui-light-rgb: 235, 237, 239;
  --cui-dark-rgb: 79, 93, 115;
  --cui-white-rgb: 255, 255, 255;
  --cui-black-rgb: 0, 0, 21;
  --cui-body-color-rgb: 44, 56, 74;
  --cui-body-bg-rgb: 255, 255, 255;
  --cui-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --cui-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --cui-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --cui-body-font-family: var(--cui-font-sans-serif);
  --cui-body-font-size: 1rem;
  --cui-body-font-weight: 400;
  --cui-body-line-height: 1.5;
  --cui-body-color: rgba(44, 56, 74, 0.95);
  --cui-body-bg: #fff;
  --cui-border-width: 1px;
  --cui-border-style: solid;
  --cui-border-color: #d8dbe0;
  --cui-border-color-translucent: rgba(0, 0, 21, 0.175);
  --cui-border-radius: 0.375rem;
  --cui-border-radius-sm: 0.25rem;
  --cui-border-radius-lg: 0.5rem;
  --cui-border-radius-xl: 1rem;
  --cui-border-radius-2xl: 2rem;
  --cui-border-radius-pill: 50rem;
  --cui-heading-color: unset;
  --cui-link-color: #321fdb;
  --cui-link-hover-color: #2819af;
  --cui-code-color: #d63384;
  --cui-highlight-bg: #fff3cd;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Scandia', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
    display: flex;
    justify-content: center;
    // margin-top: 30px;
    font-family: 'Scandia', sans-serif;
    padding-top: var(--size-minheight-topnav);
    overflow: hidden;
}

a:link { text-decoration: none; color: inherit;}
a:visited { text-decoration: none; color: inherit;}
a:hover { text-decoration: none; color: inherit;}
a:active { text-decoration: none; color: inherit;}



@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-RegularItalic.eot');
  src: local('Scandia Regular Italic'), local('Scandia-RegularItalic'),
      url('/fonts/Scandia-RegularItalic.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-RegularItalic.woff2') format('woff2'),
      url('/fonts/Scandia-RegularItalic.woff') format('woff'),
      url('/fonts/Scandia-RegularItalic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-Light.eot');
  src: local('Scandia Light'), local('Scandia-Light'),
      url('/fonts/Scandia-Light.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-Light.woff2') format('woff2'),
      url('/fonts/Scandia-Light.woff') format('woff'),
      url('/fonts/Scandia-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-BoldItalic.eot');
  src: local('Scandia Bold Italic'), local('Scandia-BoldItalic'),
      url('/fonts/Scandia-BoldItalic.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-BoldItalic.woff2') format('woff2'),
      url('/fonts/Scandia-BoldItalic.woff') format('woff'),
      url('/fonts/Scandia-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('/fonts/ScandiaLine-Bold.eot');
  src: local('Scandia Line Bold'), local('ScandiaLine-Bold'),
      url('/fonts/ScandiaLine-Bold.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ScandiaLine-Bold.woff2') format('woff2'),
      url('/fonts/ScandiaLine-Bold.woff') format('woff'),
      url('/fonts/ScandiaLine-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('/fonts/ScandiaLine-Light.eot');
  src: local('Scandia Line Light'), local('ScandiaLine-Light'),
      url('/fonts/ScandiaLine-Light.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ScandiaLine-Light.woff2') format('woff2'),
      url('/fonts/ScandiaLine-Light.woff') format('woff'),
      url('/fonts/ScandiaLine-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Stencil';
  src: url('/fonts/Scandia-Stencil.eot');
  src: local('Scandia Stencil'), local('Scandia-Stencil'),
      url('/fonts/Scandia-Stencil.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-Stencil.woff2') format('woff2'),
      url('/fonts/Scandia-Stencil.woff') format('woff'),
      url('/fonts/Scandia-Stencil.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-Medium.eot');
  src: local('Scandia Medium'), local('Scandia-Medium'),
      url('/fonts/Scandia-Medium.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-Medium.woff2') format('woff2'),
      url('/fonts/Scandia-Medium.woff') format('woff'),
      url('/fonts/Scandia-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-LightItalic.eot');
  src: local('Scandia Light Italic'), local('Scandia-LightItalic'),
      url('/fonts/Scandia-LightItalic.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-LightItalic.woff2') format('woff2'),
      url('/fonts/Scandia-LightItalic.woff') format('woff'),
      url('/fonts/Scandia-LightItalic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('/fonts/ScandiaLine-Medium.eot');
  src: local('Scandia Line Medium'), local('ScandiaLine-Medium'),
      url('/fonts/ScandiaLine-Medium.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ScandiaLine-Medium.woff2') format('woff2'),
      url('/fonts/ScandiaLine-Medium.woff') format('woff'),
      url('/fonts/ScandiaLine-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-MediumItalic.eot');
  src: local('Scandia Medium Italic'), local('Scandia-MediumItalic'),
      url('/fonts/Scandia-MediumItalic.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-MediumItalic.woff2') format('woff2'),
      url('/fonts/Scandia-MediumItalic.woff') format('woff'),
      url('/fonts/Scandia-MediumItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'Scandia Line Stencil';
  src: url('/fonts/ScandiaLine-Stencil.eot');
  src: local('Scandia Line Stencil'), local('ScandiaLine-Stencil'),
      url('/fonts/ScandiaLine-Stencil.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ScandiaLine-Stencil.woff2') format('woff2'),
      url('/fonts/ScandiaLine-Stencil.woff') format('woff'),
      url('/fonts/ScandiaLine-Stencil.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia Line';
  src: url('/fonts/ScandiaLine-Regular.eot');
  src: local('Scandia Line Regular'), local('ScandiaLine-Regular'),
      url('/fonts/ScandiaLine-Regular.eot?#iefix') format('embedded-opentype'),
      url('/fonts/ScandiaLine-Regular.woff2') format('woff2'),
      url('/fonts/ScandiaLine-Regular.woff') format('woff'),
      url('/fonts/ScandiaLine-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-Bold.eot');
  src: local('Scandia Bold'), local('Scandia-Bold'),
      url('/fonts/Scandia-Bold.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-Bold.woff2') format('woff2'),
      url('/fonts/Scandia-Bold.woff') format('woff'),
      url('/fonts/Scandia-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Scandia';
  src: url('/fonts/Scandia-Regular.eot');
  src: local('Scandia Regular'), local('Scandia-Regular'),
      url('/fonts/Scandia-Regular.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Scandia-Regular.woff2') format('woff2'),
      url('/fonts/Scandia-Regular.woff') format('woff'),
      url('/fonts/Scandia-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}



`;

export default GlobalStyle;
