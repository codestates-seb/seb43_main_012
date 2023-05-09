import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import TopNav from './components/TopNav';
import Collections from './pages/Collections';
import MyPage from './pages/MyPage';
import Signup from './pages/Signup';
import Main from './pages/Main';

import './App.css';
import { Sign } from 'crypto';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <TopNav />
      <Routes>
        <Route path='/' element={<Main />}>Main</Route>
        <Route path='/bookmarks' element={<Collections />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
