/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Alumno from './component/Alumno';
import Admin from './component/Admin';
import Footer from './component/Footer';
import Login from './component/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const navegador = useNavigate();
  const [pathAlumno, setPathAlumno] = useState("");
  const [pathAdmin, setPathAdmin] = useState("");
  const [idConectado, setIdConectado] = useState();
  const [datosAlumnoConectado, setDatosAlumnoConectado] = useState([]);

  //Esta funcion desconecta a los ussuarios cuando dan click en el boton logout
  const manejoLogout = async () => {
    navegador('/');

    const datos = { id: idConectado, conect: 0 };
    try {
        const response = await fetch('https://borras25server.vercel.app/actualizar_estado_conexion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            console.log("¡Desconectado!");
        } else {
            console.log("Error al desconectar.");
        }
    } catch (error) {
        console.log(error);
    }
  };

  //Esta funcion y useEffect manejan el evento del cierre de las pestañas o del navegador. Desconectar al ususario en la db
  useEffect(() => {
    const cleanup = cierreVentana(manejoLogout);
    return cleanup;
  }, [manejoLogout]);
  const cierreVentana = (manejoLogout) => {
    const manejoCierreVentana = (e) => {
        e.preventDefault();
        manejoLogout();
    }
    window.addEventListener('beforeunload', manejoCierreVentana);
    return () => {window.removeEventListener('beforeunload', manejoCierreVentana);}
  }

  const manejoAdmin=()=>{
    setPathAdmin('/asaHEh7JhJtiu9H0WQ00JH3jh4JHWJ34j08rj543asaHEh7JhJtiu9JHWJ34j08HWJ34j08rj543asaHEh7JhJtiu')
    navegador('/asaHEh7JhJtiu9H0WQ00JH3jh4JHWJ34j08rj543asaHEh7JhJtiu9JHWJ34j08HWJ34j08rj543asaHEh7JhJtiu'); 
  };

  const manejoAlumno= (usuario)=>{
    setPathAlumno(`/aSE43dfs6A7F8GE34${usuario.usuario}16A7F88D9ada56A7F8`);
    navegador(`/aSE43dfs6A7F8GE34${usuario.usuario}16A7F88D9ada56A7F8`);
    setDatosAlumnoConectado(usuario);
  };
  

  return (
    <div className='App'>
      <Routes>        
        <Route path='/' element={
          <Login 
            setIdConectado={setIdConectado} 
            manejoAdmin={manejoAdmin} 
            manejoAlumno={manejoAlumno}
          />} 
        />

        <Route path={pathAdmin} element={
          <Admin manejoLogout={manejoLogout}/>} 
        />
        
        <Route path={pathAlumno} element={
          <Alumno 
            datosAlumnoConectado={datosAlumnoConectado} 
            manejoLogout={manejoLogout}
          />} 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
