import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/website/login'
import Register from './components/pages/website/register'
import MainPage from './components/pages/client/main_page';
import Agregar_Planificador from './components/pages/client/Agregar/agregar_planificador';
import Agregar_Grupo from './components/pages/client/Agregar/agregar_grupo';
import Agregar_Cursos from './components/pages/client/Agregar/agregar_cursos';
import App1 from './components/pages/client/Ver/templatePlanificador';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/MainPage" element={<MainPage />}/>
        <Route path="/AgregarPlanificador" element={<Agregar_Planificador />}/>
        <Route path="/AgregarGrupo" element={<Agregar_Grupo />}/>
        <Route path="/AgregarCursos" element={<Agregar_Cursos />}/>
        <Route path="/App" element={<App1 />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App