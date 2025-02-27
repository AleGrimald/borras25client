/* eslint-disable react/prop-types */
import './Login.css';
import './MediaQueryLogin.css';
import NavBar from '../NavBar';
import { useEffect, useState } from 'react';

const Login = (props)=>{
    const {manejoAdmin, manejoAlumno, setIdConectado} = props;
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [btnLoginPulsado, setBtnLoginPulsado] = useState(false);
    
    const manejoLogin = async (e) => {
        e.preventDefault();

        let inp_usuario = document.querySelector("#inp_usuario").value;
        let inp_passw = document.querySelector("#inp_passw").value;
        let encontrado = false;

        for (const user of usuarios) {
            if (user.usuario === inp_usuario && user.passw === inp_passw && user.conectado === 0) {
                if (user.usuario === "admin") {
                    manejoAdmin();
                } else {
                    manejoAlumno(user);
                }

                encontrado = true;
                await ConectarUsuario(user);
                break;
            }
        }

        if (!encontrado) {
            setMensaje("Usuario o Contraseña incorrecto.");
            setBtnLoginPulsado(!btnLoginPulsado);
        }else{
            setMensaje("");
        }  
    }



    useEffect(() => {
        console.log("Solicitando datos a la Base de Datos")
        const url = 'https://borras25server.vercel.app/';
        //const url = 'http://localhost:3306/';

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de datos para el Login');
            }
            return response.json();
        })
        .then(data => {setUsuarios(data)})
        .catch(error => console.error('Error en la solicitud fetch a la API, Login:', error));

    }, [btnLoginPulsado]);

    const ConectarUsuario = async (user)=>{
        const datos = { 
            id: user.id_usuario, 
            conect: 1 
        };

        setIdConectado(user.id_usuario); //Esto se usa despues para el Logout
    
        try {
            const response = await fetch('https://borras25server.vercel.app/actualizar_estado_conexion', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            if (response.ok) {
                console.log("¡Conectado!");
            } else {
                console.log("Error al actualizar el estado de conexion");
            }
        } catch (error) {
            console.log("Error en la solicitud fetch, Cambio Estado Conexion: ",error);
        }
    }


    return <div className="contenedor_login">
        <NavBar clase ="nav_bar"/>
        <div className='login'>
            <h2 className='login_h2'>Iniciar Sesión</h2> 
            <form className='login_form' onSubmit={manejoLogin}> 
                <input onChange={()=>setMensaje("")} className='login_inp' id='inp_usuario' type="text" name="username" placeholder="Nombre de usuario" required /> 
                <input onChange={()=>setMensaje("")} className='login_inp' id='inp_passw' type="password" name="password" placeholder="Contraseña" required /> 
                <span>{mensaje}</span>
                <button className='login_submit' type="submit">Ingresar</button> 
            </form> 
        </div> 
        
    </div>

}

export default Login;