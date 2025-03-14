/* eslint-disable react/prop-types */
import './Admin.css';
import './AdminMediaQuery.css'
import { useEffect, useState } from 'react';

import FormulatioAlumno from '../FormularioAlumno';
import FormulatioEditarA from '../FormularioEditarA';
import ListaAlumnos from '../ListaAlumnos';
import PanelIzqAdmin from '../PanelIzqAdmin'
import GDriveViewFolder from '../GDriveViewFolder';

const Admin =(props)=>{
    const {manejoLogout} = props;
    const [btnSandwich, setBtnSandwich]=useState(false);
    const [usuario, setUsuarios] = useState([]);
    const [alumnoImpago, setAlumnoImpago] = useState([]);
    const [actualizarUsuario, setActualizarUsuario] = useState(false);

    const [datosEditar, setDatosEditar] = useState();
    const [formEditar, setFormEditar] = useState(false);

    const [btnAlumno, setBtnAlumno] = useState(false);
    const [btnRutina, setBtnRutina] = useState(false);

    const [manejoListarAlumno, setManejoListarAlumno] = useState(false);
    const [manejoAgregarAlumno, setManejoAgregarAlumno] = useState(false);
    const [manejoListarRutina, setManejoListarRutina] = useState(false);
    const [manejoAgregarRutina, setManejoAgregarRutina] = useState(false);

    useEffect(() => {
        let ultimoTiempoActividad = Date.now();
    
        const actualizaTiempoUltimaActividad = () => {
            ultimoTiempoActividad = Date.now();
        };
    
        document.addEventListener('mousemove', actualizaTiempoUltimaActividad);
        document.addEventListener('keydown', actualizaTiempoUltimaActividad);
    
        const interval = setInterval(() => {
            if (Date.now() - ultimoTiempoActividad > 300000) {
                alert("Se agotó el tiempo. Usuario inactivo");
                manejoLogout();
            }
        }, 6000); // Verifica la actividad cada 60 segundos
    
        // Limpia los eventos y el intervalo al desmontar el componente
        return () => {
            document.removeEventListener('mousemove', actualizaTiempoUltimaActividad);
            document.removeEventListener('keydown', actualizaTiempoUltimaActividad);
            clearInterval(interval);
        };
    }, [manejoLogout]); // Dependencia para asegurarse de que useEffect se ejecute solo cuando manejoLogout cambie
    

    useEffect(() => {
        const urlP = 'https://borras25server.vercel.app/admin';
        //const url = 'http://localhost:3306/admin';
        
        fetch(urlP)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data =>  setUsuarios(data))
        .catch(error => console.error('Error fetching data:', error));

        console.log("Lista de Alumnos Cargada con exito")
    },[actualizarUsuario, manejoListarAlumno]);

    useEffect(()=>{
        setAlumnoImpago(usuario.filter(user => user.estado === "Impago"));
    },[usuario]);

    const reiniciarEstados=()=>{
        setManejoAgregarAlumno(false);
        setManejoListarAlumno(false);
        setFormEditar(false);
        setManejoListarRutina(false);
        setManejoAgregarRutina(false);
    }

    const manejoListadoA =()=>{
        reiniciarEstados();
        setManejoListarAlumno(!manejoListarAlumno);
    }
    const manejoAgregarA = ()=>{
        reiniciarEstados();
        setManejoAgregarAlumno(!manejoAgregarAlumno);
    }

    const manejoListadoR = ()=>{
        reiniciarEstados();
        setManejoListarRutina(!manejoListarRutina);
    }
    const manejoAgregarR = ()=>{
        reiniciarEstados();
        setManejoAgregarRutina(!manejoAgregarRutina);
    }
    
    const panelIzq = [
        {
            setBtn: setBtnAlumno,
            valueBtn: btnAlumno,
            btnNombre: "Alumnos",
            condicion: btnAlumno,
            funciones: [manejoListadoA, manejoAgregarA],
            contenido: ["Listar Alumnos", "Agregar Alumno"],
            clases: ["izq_boton", "opciones_lista", "lista_admin", "lista_admin_elemento"]
        },
        {
            setBtn: setBtnRutina,
            valueBtn: btnRutina,
            btnNombre: "Rutinas",
            condicion: btnRutina,
            funciones: [manejoListadoR, manejoAgregarR],
            contenido: ["Listar Rutina"],
            clases: ["izq_boton", "opciones_lista", "lista_admin", "lista_admin_elemento"]
        },
    ];

    const editarAlumno=(ape, nom, tel)=>{
        const coincidencias = usuario.filter(u => u.apellido===ape && u.nombreCliente===nom && u.telefono===tel);
        if(coincidencias.length>0){
            setDatosEditar(coincidencias);
            reiniciarEstados();
            setFormEditar(true);
            console.log(coincidencias)
        }else{
            setFormEditar(false);
        }
    }
    
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
                <button onClick={()=>setBtnSandwich(!btnSandwich)} className='btn_sandwich'>☰</button>

                <button onClick={manejoLogout} className='boton_unete'>Log-out</button>
            </div>


        </nav>
        <main className='admin_main'>

            <aside className={btnSandwich?'main_panel_lateral_oculto':'main_panel_lateral'}>
                {
                    
                    panelIzq.map((p, index)=><PanelIzqAdmin 
                        key={index} 
                        setBtn={p.setBtn}
                        valueBtn={p.valueBtn}
                        btnNombre={p.btnNombre}
                        condicion={p.condicion}
                        funciones={p.funciones}
                        contenido={p.contenido}
                        clases={p.clases}
                    />)
                    
                }
            </aside>

            <article className='main_panel_central'>
                {
                    manejoListarAlumno?<ListaAlumnos 
                        usuarios={usuario} 
                        editar={editarAlumno}
                        actualizar={setActualizarUsuario} 
                        actualizarValue={actualizarUsuario}/>
                    :<></>
                }

                {
                    manejoAgregarAlumno?<FormulatioAlumno 
                        usuario={usuario}
                        actualizar={setActualizarUsuario} 
                        actualizarValue={actualizarUsuario} 
                        setForm={setManejoAgregarAlumno} 
                        lista={setManejoListarAlumno}/>
                    :<></>                    
                }

                {
                    formEditar?<FormulatioEditarA 
                        actualizar={setActualizarUsuario} 
                        actualizarValue={actualizarUsuario} 
                        setForm={setFormEditar} 
                        lista={setManejoListarAlumno} 
                        dat={datosEditar} 
                        reiniciarMain={reiniciarEstados}/>
                    :<></>
                }

                {
                    manejoListarRutina?<GDriveViewFolder/>:<></>
                }

            </article>

            <aside className='main_panel_alumno'>
                {
                    alumnoImpago.map((user, index) =>
                        <article className='tarjeta_alumno' key={index}>
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
                        </article>
                    )
                }
            </aside>
        </main>
    </section>
}

export default Admin;