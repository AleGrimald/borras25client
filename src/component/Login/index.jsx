/* eslint-disable react/prop-types */
import './Login.css';
import './MediaQueryLogin.css';
import NavBar from '../NavBar';
import { useEffect, useState } from 'react';

const Login = (props)=>{
    const {manejoAdmin, manejoAlumno, setIdConectado} = props;
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(() => {
        const urlP = 'https://borras25server.vercel.app/';
        //const urlP = 'http://localhost:3306/';

        fetch(urlP)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {setUsuarios(data)})
        .catch(error => console.error('Error fetching data:', error));

    }, []);

    const manejoSubmit = async (e)=>{
        e.preventDefault();
        let inp_usuario = document.querySelector("#inp_usuario").value;
        let inp_passw = document.querySelector("#inp_passw").value;
        let encontrado = false;

        await usuarios.map(user=>{
            if(user.usuario === inp_usuario && user.passw === inp_passw && user.conectado===0){
                console.log("ES HORA DE ENTRENAR, ",user.usuario);
                if(user.usuario==="admin"){
                    manejoAdmin();
                }else{
                    manejoAlumno(`${user.usuario}`);
                }

                const datos ={id:user.id_usuario, conect: 1};
                setIdConectado(user.id_usuario);
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

                encontrado=true;
                return;
            }
        })

        if(!encontrado){
            encontrado=false;
            setMensaje("Usuario o Contraseña incorrecto.");
        }
    }

    return <div className="contenedor_login">
        <NavBar clase ="nav_bar"/>
        <div className='login'>
            <h2 className='login_h2'>Iniciar Sesión</h2> 
            <form className='login_form' onSubmit={manejoSubmit}> 
                <input onChange={()=>setMensaje("")} className='login_inp' id='inp_usuario' type="text" name="username" placeholder="Nombre de usuario" required /> 
                <input onChange={()=>setMensaje("")} className='login_inp' id='inp_passw' type="password" name="password" placeholder="Contraseña" required /> 
                <span>{mensaje}</span>
                <button className='login_submit' type="submit">Ingresar</button> 
            </form> 
        </div> 
        
    </div>

}

export default Login;