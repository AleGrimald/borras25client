import './Admin.css';
import { useEffect, useState } from 'react';

const Admin =(props)=>{
    const {manejoLogin} = props;
    const [usuario, setUsuarios] = useState([]);

    useEffect(() => {
        const urlP = 'https://borras25server.vercel.app/admin';
        //const url = 'http://localhost:3000/admin';
        
        fetch(urlP)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error fetching data:', error));
    });

    return<section className='contenedor_admin'>
        <nav className="nav_bar">
            <div className='nav_logo'>
                <img className='logo_img' src="logo_borras.svg" alt="" />
                <div className='logo_texto'>
                    <h1 className='texto_h1'>BORRAS FRANCO</h1>
                    <h5 className='texto_h5'>PROF. EDUCACION FISICA</h5>
                </div>
            </div>

            <div className='nav_boton'>
                <button onClick={manejoLogin} className='boton_unete'>Log-out</button>
            </div>
        </nav>
        <main className='admin_main'>
            <aside className='main_panel_lateral'>
                <button className='izq_boton'>Alumnos</button>
                <button className='izq_boton'>Rutinas</button>
                <span id='opciones'></span>
            </aside>

            <article className='main_panel_central'></article>

            <aside className='main_panel_alumno'>
                {
                    usuario.map((user, index)=><article className='tarjeta_alumno' key={index}>
                        <section className='section_alumno_datos'>
                            <img className='alumno_img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTL1u8S1Nl0_yHeJLr-XRUSwTP-y-iyXq4Jw&s" alt="persona" />
                            <div className='alimno_datos_contacto'>
                                <h5 className='alumno_h4'>{user.apellido}, {user.nombreCliente}</h5>
                                <a href={'https://wa.me/'+user.telefono} className='alumno_h5'>{user.telefono}</a>
                            </div>
                        </section>
                        <section className='section_alumno_cuenta'>
                            <p className='cuenta_p'>Entrenamiento: {user.nombre}</p>
                            <p className='cuenta_p'>Estado: {user.estado}</p>
                        </section>
                    </article>)
                }
            </aside>
        </main>
    </section>
}

export default Admin;