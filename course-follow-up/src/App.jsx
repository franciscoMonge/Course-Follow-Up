import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/website/login'
import Register from './components/pages/website/register'
import MainPage from './components/pages/client/main_page';
import Agregar_Planificador from './components/pages/client/Agregar/agregar_planificador';
import Agregar_Grupo from './components/pages/client/Agregar/agregar_grupo';
import Crear_Grupo from './components/pages/client/Agregar/crear_grupo';
import Agregar_Cursos from './components/pages/client/Agregar/agregar_cursos';
import Agregar_Cursos_Indiv from './components/pages/client/Agregar/agregar_cursos_indiv';
import App1 from './components/pages/client/Ver/templatePlanificador';
import Ver_Planificador from './components/pages/client/Ver/ver_planificador';
import Modificar_Planificacion from './components/pages/client/Modificar/modificar_planificacion';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/MainPage" element={<MainPage />}/>
        <Route path="/AgregarPlanificador" element={<Agregar_Planificador />}/>
        <Route path="/Modificar_Planificacion" element={<Modificar_Planificacion />}/>
        <Route path="/AgregarGrupo" element={<Agregar_Grupo />}/>
        <Route path="/CrearGrupo" element={<Crear_Grupo />}/>
        <Route path="/AgregarCursos" element={<Agregar_Cursos />}/>
        <Route path="/AgregarCursoIndividual" element={<Agregar_Cursos_Indiv />}/>
        <Route path="/SeleccionaAño" element={<Ver_Planificador />}/>
        <Route path="/App" element={<App1 />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App