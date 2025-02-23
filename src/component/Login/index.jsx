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
    
    useEffect(() => {
        const url = 'https://borras25server.vercel.app/';
        //const url = 'http://localhost:3306/';

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar datos de usuario en Login');
            }
            return response.json();
        })
        .then(data => {setUsuarios(data)})
        .catch(error => console.error('Error en la respuesta Login:', error));

    }, [btnLoginPulsado]);

    const manejoLogin = async (e) => {
        let inp_usuario = document.querySelector("#inp_usuario").value;
        let inp_passw = document.querySelector("#inp_passw").value;
        let encontrado = false;

        e.preventDefault();
        setBtnLoginPulsado(!btnLoginPulsado);

        for (const user of usuarios) {
            if (user.usuario === inp_usuario && user.passw === inp_passw && user.conectado === 0) {
                if (user.usuario === "admin") {
                    manejoAdmin();
                } else {
                    manejoAlumno(user);
                }
    
                const datos = { id: user.id_usuario, conect: 1 };
                setIdConectado(user.id_usuario);
    
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
                    console.log(error);
                }
    
                encontrado = true;
                break;
            }
        }
    
        if (!encontrado) {
            setMensaje("Usuario o Contraseña incorrecto.");
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