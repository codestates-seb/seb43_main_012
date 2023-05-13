import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//style
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./styles/theme/LightTheme";
//pages
import TopNav from "./components/TopNav";
import Collections from "./pages/Collections";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import CounterExample from "./pages/CounterExample";
//components
import ModalLogin from "./components/modals/ModalLogin";
import History from "./components/overlay/History";
import CollectionPins from "./components/overlay/CollectionPins";
import DialogBoxUserIcon from "./components/dialogbox/DialogBoxUserIcon";

function App() {
  //open interim components
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showPinnedItems, setShowPinnedItems] = useState<boolean>(false);
  //login state, modalOpen dialogOpen State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <ThemeProvider theme={LightTheme}>
        <GlobalStyle />
        <Router>
          <TopNav
            showHistory={showHistory}
            setShowHistory={setShowHistory}
            showPinnedItems={showPinnedItems}
            setShowPinnedItems={setShowPinnedItems}
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
          {showHistory && <History />}
          {showPinnedItems && <CollectionPins />}
          <Routes>
            <Route path="/" element={<Main />}>
              Main
            </Route>
            <Route path="/bookmarks" element={<Collections />} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
