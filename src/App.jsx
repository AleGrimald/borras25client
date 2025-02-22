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
  const [idConectado, setIdConectado] = useState();
  const [datosAlumnoConectado, setDatosAlumnoConectado] = useState([]);

  const manejoLogin= ()=>{
    navegador('/');

    const datos ={id:idConectado, conect: 0};
    try {
        const response = fetch('https://borras25server.vercel.app/actualizar_login', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            console.log("¡Usuario y Cliente editado exitosamente!");
        } else {
            console.log("Error al editar los datos.");
        }
    }catch(error){
        console.log(error)
    }
  };

  const manejoAdmin= ()=>{
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
        <Route path='/' element={<Login setIdConectado={setIdConectado} manejoAdmin={manejoAdmin} manejoAlumno={manejoAlumno}/>} />
        <Route path='/asaHEh7JhJtiu9H0WQ00JH3jh4JHWJ34j08rj543asaHEh7JhJtiu9JHWJ34j08HWJ34j08rj543asaHEh7JhJtiu' element={<Admin manejoLogin={manejoLogin}/>} />
        <Route path={pathAlumno} element={<Alumno datosAlumnoConectado={datosAlumnoConectado} manejoLogin={manejoLogin}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
