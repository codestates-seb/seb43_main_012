import React from 'react';
import { Counter } from './features/counter/Counter';
import { useState, SetStateAction, Dispatch } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './styles/theme/LightTheme';
import TopNav from './components/TopNav';
import History from './components/History';
import CollectionPins from './components/CollectionPins';
import Collections from './pages/Collections';
import MyPage from './pages/MyPage';
import Signup from './pages/Signup';
import Main from './pages/Main';

function App() {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showPinnedItems, setShowPinnedItems] = useState<boolean>(false);

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
          />
          {showHistory ? <History /> : null}
          {showPinnedItems ? <CollectionPins /> : null}
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
