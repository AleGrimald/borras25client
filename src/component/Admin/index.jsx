import './Admin.css';
import { useEffect, useState } from 'react';

const Admin =(props)=>{
    const {manejoLogin} = props;
    const [usuario, setUsuarios] = useState([]);
    const [btnAlumno, setBtnAlumno] = useState(false);
    const [btnRutina, setBtnRutina] = useState(false);
    const [btnEjercicio, setBtnEjercicio] = useState(false);
    const [manejoListarAlumno, setManejoListarAlumno] = useState(false);
    const [manejoAgregarAlumno, setManejoAgregarAlumno] = useState(false);

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
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error fetching data:', error));
    });

    const reiniciarEstados=()=>{
        setManejoAgregarAlumno(false);
        setManejoListarAlumno(false);
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
                <button onClick={manejoLogin} className='boton_unete'>Log-out</button>
            </div>
        </nav>
        <main className='admin_main'>
            <aside className='main_panel_lateral'>
                <button className='izq_boton' onClick={()=>{setBtnAlumno(!btnAlumno)}}>Alumnos</button>
                <span className='opciones_lista'>
                    {
                        btnAlumno?
                            <ul className='lista_admin'>
                                <li onClick={()=>{setManejoListarAlumno(!manejoListarAlumno)}} className='lista_admin_elemento'>Listar Alumnos</li>
                                <li onClick={()=>{setManejoAgregarAlumno(!manejoAgregarAlumno)}} className='lista_admin_elemento'>Agregar Alumno</li>
                                <li onClick={reiniciarEstados} className='lista_admin_elemento'>Modificar Alumno</li>
                                <li onClick={reiniciarEstados} className='lista_admin_elemento'>Eliminar Alumno</li>
                            </ul>
                        :<></>
                    }
                </span>

                <button className='izq_boton' onClick={()=>{setBtnRutina(!btnRutina)}}>Rutinas</button>
                <span className='opciones_lista'>
                    {
                        btnRutina?
                            <ul className='lista_admin'>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Listar Rutina</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Crear Rutina</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Modificar Rutina</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Eliminar Rutina</li>
                            </ul>
                        :<></>
                    }
                </span>

                <button className='izq_boton' onClick={()=>{setBtnEjercicio(!btnEjercicio)}}>Ejercicio</button>
                <span className='opciones_lista'>
                    {
                        btnEjercicio?
                            <ul className='lista_admin'>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Listar Ejercicios</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Crear Ejercicio</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Modificar Ejercicio</li>
                                <li onClick={manejoPanelCentral} className='lista_admin_elemento'>Eliminar Ejercicio</li>
                            </ul>
                        :<></>
                    }
                </span>
                
            </aside>

            <article className='main_panel_central'>
                {
                    manejoListarAlumno?usuario.map((user, index) =>
                        <article className='tarjeta_alumno_central' key={index}>
                            <section className='section_alumno_datos_central'>
                                <img className='alumno_img_central' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTL1u8S1Nl0_yHeJLr-XRUSwTP-y-iyXq4Jw&s" alt="persona" />
                            </section>
                            <section className='section_alumno_cuenta_central'>
                                <div className='alimno_datos_contacto_central'>
                                    <h5 className='alumno_h4_central'>{user.apellido}, {user.nombreCliente}</h5>
                                    <a href={'https://wa.me/'+user.telefono} className='alumno_h5_central'>{user.telefono}</a>
                                </div>
                                <p className='cuenta_p_central'>Entrenamiento: {user.nombre}</p>
                                <p className='cuenta_p_central'>Estado: {user.estado}</p>
                            </section>
                        </article>):<></>
                }

                {
                    manejoAgregarAlumno?<form action="" className='form'>
                        <h2 className='form_h2'>Formulario de Inscripcion</h2>
                        <fieldset className='form_field'>
                            <legend className='form_legend'>Datos Personales</legend>
                            <div className='form_div'>
                                <label htmlFor="">Apellido *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Nombre *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Dni *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Edad *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            
                            <div className='form_div'>
                                <label htmlFor="">Telefono *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Email *</label>
                                <input type="text" name="" id="" required/>
                            </div>

                            <fieldset className='form_field'>
                                <legend className='form_legend'>Direccion</legend>
                                <div className='form_div'>
                                    <label htmlFor="">Pais *</label>
                                    <input type="text" name="" id="" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Provincia *</label>
                                    <input type="text" name="" id="" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Departamento</label>
                                    <input type="text" name="" id="" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Localidad</label>
                                    <input type="text" name="" id="" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Calle *</label>
                                    <input type="text" name="" id="" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Numero *</label>
                                    <input type="number" name="" id="" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Piso</label>
                                    <input type="text" name="" id="" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="">Dpto</label>
                                    <input type="text" name="" id="" />
                                </div>
                                
                            </fieldset>
                        </fieldset>

                        <fieldset className='form_field'>
                            <legend className='form_legend'>Datos de Usuario</legend>
                            <div className='form_div'>
                                <label htmlFor="">Usuario *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Contraseña *</label>
                                <input type="password" name="" id="" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="">Confirmar Contraseña *</label>
                                <input type="text" name="" id="" required/>
                            </div>
                            
                            <div className='form_div'>
                                <label htmlFor="">Plan de Entrenamiento *</label>
                                <select name="" id="" required>
                                    <option value="" disabled selected>Seleccione una opcion</option>
                                    <option value="">Basico</option>
                                    <option value="">Intermedio</option>
                                    <option value="">Profecional</option>
                                    <option value="">Nivel Asiatico</option>
                                </select>
                            </div>
                            
                        </fieldset>
                        
                        <fieldset className='form_field'>
                            <legend className='form_legend'>Fecha de Inicio - Fin</legend>

                            <div className='form_div'>
                                <label htmlFor="">Fecha de Inicio *</label>
                                <input type="date" name="" id="" required/>
                            </div>

                            <div className='form_div'>
                                <label htmlFor="">Fecha de Fin *</label>
                                <input type="date" name="" id="" required/>
                            </div>
                        </fieldset>

                    </form>:<></>
                }
            </article>

            <aside className='main_panel_alumno'>
                {
                    usuario.filter(user => user.estado === "impago").map((user, index) =>
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