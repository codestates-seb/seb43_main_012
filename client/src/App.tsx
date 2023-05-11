import React from 'react';
import { useState, SetStateAction, Dispatch } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//style
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './styles/theme/LightTheme';
//pages & components
import TopNav from './components/TopNav';
import History from './components/History';
import CollectionPins from './components/CollectionPins';
import DialogBoxUserIcon from './components/dialogbox/DialogBoxUserIcon';
import Collections from './pages/Collections';
import MyPage from './pages/MyPage';
import Signup from './pages/Signup';
import Main from './pages/Main';
// import { config } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// config.autoAddCss = false;

function App() {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showPinnedItems, setShowPinnedItems] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

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
            setDialogPosition={setDialogPosition}
          />
          {isUserDialogOpen && <DialogBoxUserIcon dialogPosition={dialogPosition} />}
          {showHistory && <History />}
          {showPinnedItems && <CollectionPins />}
          <Routes>
            <Route path="/" element={<Main />}>
              Main
            </Route>
            <Route path="/bookmarks" element={<Collections />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
