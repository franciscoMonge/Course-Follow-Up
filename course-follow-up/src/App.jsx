import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/website/login'
import Register from './components/pages/website/register'
import MainPage from './components/pages/client/main_page';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/MainPage" element={<MainPage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App