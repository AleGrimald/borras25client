import './Admin.css';
import { useEffect, useState } from 'react';

const Admin =(props)=>{
    const {manejoLogin} = props;
    const [usuario, setUsuarios] = useState([]);
    const [datosAlumno, setDatosAlumno] = useState({});

    const [btnAlumno, setBtnAlumno] = useState(false);
    const [btnRutina, setBtnRutina] = useState(false);
    const [btnEjercicio, setBtnEjercicio] = useState(false);

    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [edad, setEdad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [pais, setPais] = useState("");
    const [provincia, setProvincia] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [piso, setPiso] = useState("");
    const [dpto, setDpto] = useState("");
    const [usuarioInp, setUsuarioInp] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confContraseña, setConfContraseña] = useState("");
    const [opcionPlan, setOpcionPlan] = useState("0");
    const [fechaI, setFechaI] = useState("");
    const [fechaF, setFechaF] = useState("");

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

    useEffect(() => {
        if (fechaI) {
            const fechaInicio = new Date(fechaI);
            const fechaFin = new Date(fechaInicio);
            fechaFin.setDate(fechaFin.getDate() + 30);
            setFechaF(fechaFin.toISOString().split('T')[0]); // Formatear la fecha a 'YYYY-MM-DD'
        }
    }, [fechaI]);

    const manejoFormulario = async (e)=>{
        e.preventDefault();
        let datos={};

        if(contraseña===confContraseña){
            switch(opcionPlan){
                case "Basico": setOpcionPlan("1"); break;
                case "Competitivo": setOpcionPlan("2"); break;
                case "Profesional": setOpcionPlan("3"); break;
            }

            datos = {
                ape: apellido,
                nom: nombre,
                dni: dni,
                ed: edad,
                tel: telefono,
                mail: email,
                pais: pais,
                prov: provincia,
                dep: departamento,
                loc: localidad,
                calle: calle,
                num: numero,
                piso: piso,
                dpto: dpto,
                usu: usuarioInp,
                pass: contraseña,
                plan: opcionPlan,
                fechaInicio: fechaI,
                fechaFin: fechaF
            }
            setDatosAlumno(datos);

            try{
                const response = await fetch('https://borras25server.vercel.app/agregar_alumno',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosAlumno)
                });

                if(response.ok){
                    console.log("¡Alumno agregado exitosamente!")
                }else{
                    console.log("Error al enviar los datos.")
                }
            }
            catch(error){
                console.log(`Error al enviar los datos: ${error}`)
            }
        }
    }

    const reiniciarEstados=()=>{
        setManejoAgregarAlumno(false);
        setManejoListarAlumno(false);
    }

    const manejoListadoA =()=>{
        reiniciarEstados();
        setManejoListarAlumno(!manejoListarAlumno);
    }
    const manejoAgregarA = ()=>{
        reiniciarEstados();
        setManejoAgregarAlumno(!manejoAgregarAlumno);
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
                                <li onClick={manejoListadoA} className='lista_admin_elemento'>Listar Alumnos</li>
                                <li onClick={manejoAgregarA} className='lista_admin_elemento'>Agregar Alumno</li>
                            </ul>
                        :<></>
                    }
                </span>

                <button className='izq_boton' onClick={()=>{setBtnRutina(!btnRutina)}}>Rutinas</button>
                <span className='opciones_lista'>
                    {
                        btnRutina?
                            <ul className='lista_admin'>
                                <li className='lista_admin_elemento'>Listar Rutina</li>
                                <li className='lista_admin_elemento'>Crear Rutina</li>
                            </ul>
                        :<></>
                    }
                </span>

                <button className='izq_boton' onClick={()=>{setBtnEjercicio(!btnEjercicio)}}>Ejercicio</button>
                <span className='opciones_lista'>
                    {
                        btnEjercicio?
                            <ul className='lista_admin'>
                                <li className='lista_admin_elemento'>Listar Ejercicios</li>
                                <li className='lista_admin_elemento'>Crear Ejercicio</li>
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
                            <section className='section_alumno_btn_central'>
                                <button className='alumno_btn_editar'>Editar</button>
                                <button className='alumno_btn_borrar'>Borrar</button>
                            </section>
                        </article>):<></>
                }

                {
                    manejoAgregarAlumno?
                    <form onSubmit={manejoFormulario} action="" className='form'>
                        <h2 className='form_h2'>Formulario de Inscripcion</h2>
                        <fieldset className='form_field'>
                            <legend className='form_legend'>Datos Personales</legend>
                            <div className='form_div'>
                                <label htmlFor="apellido">Apellido *</label>
                                <input onChange={(e) => setApellido(e.target.value)} type="text" name="apellido" id="apellido" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="nombre">Nombre *</label>
                                <input onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="dni">Dni *</label>
                                <input onChange={(e) => setDni(e.target.value)} type="text" name="dni" id="dni" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="edad">Edad *</label>
                                <input onChange={(e) => setEdad(e.target.value)} type="text" name="edad" id="edad" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="telefono">Telefono *</label>
                                <input onChange={(e) => setTelefono(e.target.value)} type="text" name="telefono" id="telefono" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="email">Email *</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" required/>
                            </div>
                            <fieldset className='form_field'>
                                <legend className='form_legend'>Direccion</legend>
                                <div className='form_div'>
                                    <label htmlFor="pais">Pais *</label>
                                    <input onChange={(e) => setPais(e.target.value)} type="text" name="pais" id="pais" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="provincia">Provincia *</label>
                                    <input onChange={(e) => setProvincia(e.target.value)} type="text" name="provincia" id="provincia" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="departamento">Departamento</label>
                                    <input onChange={(e) => setDepartamento(e.target.value)} type="text" name="departamento" id="departamento" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="localidad">Localidad</label>
                                    <input onChange={(e) => setLocalidad(e.target.value)} type="text" name="localidad" id="localidad" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="calle">Calle *</label>
                                    <input onChange={(e) => setCalle(e.target.value)} type="text" name="calle" id="calle" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="numero">Numero *</label>
                                    <input onChange={(e) => setNumero(e.target.value)} type="number" name="numero" id="numero+" required/>
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="piso">Piso</label>
                                    <input onChange={(e) => setPiso(e.target.value)} type="text" name="piso" id="piso" />
                                </div>
                                <div className='form_div'>
                                    <label htmlFor="dpto">Dpto</label>
                                    <input onChange={(e) => setDpto(e.target.value)} type="text" name="dpto" id="dpto" />
                                </div>
                            </fieldset>
                        </fieldset>

                        <fieldset className='form_field'>
                            <legend className='form_legend'>Datos de Usuario</legend>
                            <div className='form_div'>
                                <label htmlFor="usuario">Usuario *</label>
                                <input onChange={(e) => setUsuarioInp(e.target.value)} type="text" name="usuario" id="usuario" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="contraseña">Contraseña *</label>
                                <input onChange={(e) => setContraseña(e.target.value)} type="password" name="contraseña" id="contraseña" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="confContraseña">Confirmar Contraseña *</label>
                                <input onChange={(e) => setConfContraseña(e.target.value)} type="text" name="confContraseña" id="confContraseña" required/>
                            </div>
                            <div className='form_div'>
                                <label htmlFor="planE">Plan de Entrenamiento *</label>
                                <select value={opcionPlan} onChange={(e)=>{setOpcionPlan(e.target.value)}} name="planE" id="planE" required>
                                    <option value="0">Selecciona una opcion</option>
                                    <option value="1">Basico</option>
                                    <option value="2">Competitivo</option>
                                    <option value="3">Profesional</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className='form_field'>
                            <legend className='form_legend'>Fecha de Inicio - Fin</legend>
                            <div className='form_div'>
                                <label htmlFor="fechaI">Fecha de Inicio *</label>
                                <input onChange={(e) => setFechaI(e.target.value)} type="date" name="fechaI" id="fechaI" required/>
                            </div>
                        </fieldset>

                        <fieldset className='form_field form_field_btn'>
                            <input className='form_btn_confirmar' type="submit" value="Confirmar" />
                            <input className='form_btn_limpiar' type="reset" value="Limpiar" />
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