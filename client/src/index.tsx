import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import { ThemeProvider } from 'styled-components';
// import { LightTheme } from './styles/theme/LightTheme';
// import GlobalStyle from './styles/GlobalStyle';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <ThemeProvider theme={LightTheme}> */}
      {/* <GlobalStyle /> */}
      <App />
      {/* </ThemeProvider> */}
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
