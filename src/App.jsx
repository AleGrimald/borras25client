import './App.css';
import Alumno from './component/Alumno';
import Admin from './component/Admin';
import Footer from './component/Footer';
import Login from './component/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const navegador = useNavigate();
  const [pathAlumno, setPathAlumno] = useState("");

  const manejoLogin= ()=>{
    navegador('/');   
  };

  const manejoAdmin= ()=>{
    navegador('/asaHEh7JhJtiu9H0WQ00JH3jh4JHWJ34j08rj543asaHEh7JhJtiu9JHWJ34j08HWJ34j08rj543asaHEh7JhJtiu'); 
  };

  const manejoAlumno= (usuario)=>{
    setPathAlumno(`/aSE43dfs6A7F8GE34${usuario}16A7F88D9ada56A7F8`);
    navegador(`/aSE43dfs6A7F8GE34${usuario}16A7F88D9ada56A7F8`);
  };
  

  return (
    <div className='App'>
      <Routes>        
        <Route path='/' element={<Login manejoAdmin={manejoAdmin} manejoAlumno={manejoAlumno}/>} />
        <Route path='/asaHEh7JhJtiu9H0WQ00JH3jh4JHWJ34j08rj543asaHEh7JhJtiu9JHWJ34j08HWJ34j08rj543asaHEh7JhJtiu' element={<Admin manejoLogin={manejoLogin}/>} />
        <Route path={pathAlumno} element={<Alumno manejoLogin={manejoLogin}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
