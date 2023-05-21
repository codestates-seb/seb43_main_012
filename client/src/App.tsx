import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//style
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './styles/theme/LightTheme';
import './styles/sass/custom_popover_modal.scss';

//Lazy-loaded pages & components

const TopNav = lazy(() => import('./components/TopNav'));
const Collections = lazy(() => import('./pages/Collections'));
const MyPage = lazy(() => import('./pages/MyPage'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Main = lazy(() => import('./pages/Main'));
const CounterExample = lazy(() => import('./pages/CounterExample'));
const ModalLogin = lazy(() => import('./components/modals/ModalLogin'));
const History = lazy(() => import('./pages/History'));
const Loading = lazy(() => import('./components/chatinterface/Loading'));

const CollectionPins = lazy(
  () => import('./components/overlay/CollectionPins'),
);
const DialogBoxUserIcon = lazy(
  () => import('./components/dialogbox/DialogBoxUserIcon'),
);

function App() {
  //login state, modalOpen dialogOpen State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <GlobalStyle />
        <Suspense fallback={<Loading />}>
          <Router>
            <TopNav
              isLoggedIn={isLoggedIn}
              isUserDialogOpen={isUserDialogOpen}
              setIsUserDialogOpen={setIsUserDialogOpen}
              setIsModalLoginOpen={setIsModalLoginOpen}
              setDialogPosition={setDialogPosition}
            />
            {isModalLoginOpen && (
              <ModalLogin
                isOpen={isModalLoginOpen}
                setIsOpen={setIsModalLoginOpen}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
            {isUserDialogOpen && (
              <DialogBoxUserIcon
                dialogPosition={dialogPosition}
                setIsUserDialogOpen={setIsUserDialogOpen}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
            {/* {showHistory && <History />}
          {showPinnedItems && <CollectionPins />} */}
            <Routes>
              <Route path="/" element={<Main isOpen={isModalLoginOpen} />} />
              <Route path="/history" element={<History />} />
              <Route path="/collection" element={<Collections />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/counter" element={<CounterExample />} />
              <Route
                path="/login"
                element={
                  <Login
                    isOpen={isModalLoginOpen}
                    setIsOpen={setIsModalLoginOpen}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </Router>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
