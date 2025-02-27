import './Formulario.css'
import { useState, useEffect } from "react";
import { gapi } from 'gapi-script';

import ModalFormulario from "../ModalFormularios";

const FormulatioAlumno=(porps)=>{
    const {usuario, setForm, actualizar, actualizarValue, lista}=porps;

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
    const [estado, setEstado] = useState("");

    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        if (fechaI) {
            const fechaInicio = new Date(fechaI);
            if (!isNaN(fechaInicio)) {
                const fechaFin = new Date(fechaInicio);
                fechaFin.setDate(fechaFin.getDate() + 30);
                setFechaF(fechaFin.toISOString().split('T')[0]);
    
                const fechaActual = new Date();
                const diferenciaDias = Math.floor((fechaFin - fechaActual) / (1000 * 60 * 60 * 24));
    
                if (diferenciaDias < 0) {
                    setEstado("Impago");
                } else if (diferenciaDias <= 5) {
                    setEstado("Próximo a vencer");
                } else {
                    setEstado("Pagado");
                }
            } else {
                console.error('Invalid start date:', fechaI);
            }
        }
    }, [fechaI]); // Solo dependemos de "fechaI"

    // Autenticación y configuración de la API
    const cargarGApi=(nombreAlumno)=>{
        gapi.load('client:auth2', ()=> initClient(nombreAlumno));
    }
    

    function initClient(nombreAlumno) {
        gapi.client.init({
            apiKey: 'AIzaSyA9Vrs2QzrIuemwqIfYpheiIsMPtgSqcE4',
            clientId: '202413920451-5p4c1h28vgq75554qnppflmh3kspsarr.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.readonly',
        }).then(function () {
            crearCarpetaAlumno(nombreAlumno);
        });
    }

    function crearCarpetaAlumno(nombreAlumno) {
        gapi.client.drive.files.create({
            resource: {
                'name': nombreAlumno,
                'mimeType': 'application/vnd.google-apps.folder'
            },
            fields: 'id'
        }).then(function (response) {
            var carpetaId = response.result.id;
            var meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            meses.forEach(function (mes) {
                crearSubCarpeta(carpetaId, mes);
            });
        });
    }

    function crearSubCarpeta(carpetaPadreId, subCarpetaNombre) {
        gapi.client.drive.files.create({
            resource: {
                'name': subCarpetaNombre,
                'mimeType': 'application/vnd.google-apps.folder',
                'parents': [carpetaPadreId]
            },
            fields: 'id'
        }).then(function (response) {
            console.log('Subcarpeta creada: ' + response.result.id);
        });
    }


    const manejoFormulario = async (e)=>{
        e.preventDefault();
        let datos={};

        if(contraseña===confContraseña){
            switch(opcionPlan){
                case "Basico": setOpcionPlan("1"); break;
                case "Competitivo": setOpcionPlan("2"); break;
                case "Profesional": setOpcionPlan("3"); break;
            }

            let idUsuario = Math.max(...usuario.map(u=> u.id_cliente)) +1;

            datos = {
                id: idUsuario,
                ape: apellido,
                nom: nombre,
                ed: parseInt(edad),
                dni: parseInt(dni),
                mail: email,                
                tel: parseInt(telefono),
                pais: pais,
                prov: provincia,
                dep: departamento,
                loc: localidad,
                calle: calle,
                num: parseInt(numero),
                piso: parseInt(piso),
                dpto: dpto,
                usu: usuarioInp,
                pass: contraseña,
                fechaInicio: fechaI,
                fechaFin: fechaF,
                estado: estado,
                plan: parseInt(opcionPlan),
            }

            try {
                const response = await fetch('https://borras25server.vercel.app/agregar_usuario_cliente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                if (response.ok) {
                    console.log("¡Usuario y Cliente agregados exitosamente!");
                    cargarGApi(datos.nom);
                } else {
                    console.log("Error al enviar los datos.");
                }
            }catch (error) {
                console.log(`Error al enviar los datos: ${error}`);
            }
            
        }
        setModal(true);
    }

    const volverLista=()=>{
        actualizar(!actualizarValue);
        lista(true);
        setForm(false);
    }

    const validarLetra=(set,e)=>{
        if(!(/[^A-Za-z\s]/.test(e.target.value))){
            set(e.target.value);
        }
    }

    const validarNumero=(set,e)=>{
        if(!/[^0-9]/.test(e.target.value)){
            set(e.target.value);
        }
    }

    const validarEmail=(set,e)=>{
        const emailRegex = /^[A-Za-z0-9._@-]+$/
        if (emailRegex.test(e.target.value) || e.target.value==="") {
            set(e.target.value);
        }
    }

    return <>
        {
            modal?<ModalFormulario volverLista={volverLista} nombre="agregado"/>:<></>
        }
        <form onSubmit={manejoFormulario} action="" className='form'>
            <h2 className='form_h2'>Formulario de Inscripcion</h2>
            <fieldset className='form_field'>
                <legend className='form_legend'>Datos Personales</legend>
                <div className='form_div'>
                    <label htmlFor="apellido">Apellido *</label>
                    <input onChange={(e) => validarLetra(setApellido,e)} value={apellido} type="text" name="apellido" id="apellido" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="nombre">Nombre *</label>
                    <input onChange={(e) => validarLetra(setNombre,e)} value={nombre} type="text" name="nombre" id="nombre" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="dni">Dni *</label>
                    <input onChange={(e) => validarNumero(setDni,e)} value={dni} maxLength={9} type="text" name="dni" id="dni" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="edad">Edad *</label>
                    <input onChange={(e) => validarNumero(setEdad,e)} value={edad} maxLength={2} type="text" name="edad" id="edad" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="telefono">Telefono *</label>
                    <input onChange={(e) => validarNumero(setTelefono,e)} value={telefono} maxLength={16} type="text" name="telefono" id="telefono" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="email">Email *</label>
                    <input onChange={(e) => validarEmail(setEmail, e)} value={email} type="email" name="email" id="email" required/>
                </div>
                <fieldset className='form_field'>
                    <legend className='form_legend'>Direccion</legend>
                    <div className='form_div'>
                        <label htmlFor="pais">Pais *</label>
                        <input onChange={(e) => validarLetra(setPais, e)} value={pais} maxLength={19} type="text" name="pais" id="pais" required/>
                    </div>
                    <div className='form_div'>
                        <label htmlFor="provincia">Provincia *</label>
                        <input onChange={(e) => validarLetra(setProvincia, e)} value={provincia} maxLength={40} type="text" name="provincia" id="provincia" required/>
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
                    <input onChange={(e) => setConfContraseña(e.target.value)} type="password" name="confContraseña" id="confContraseña" required/>
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
                    <input value={fechaI} onChange={(e) => setFechaI(e.target.value)} type="date" name="fechaI" id="fechaI" required/>
                </div>
            </fieldset>

            <fieldset className='form_field form_field_btn'>
                <input className='form_btn_confirmar' type="submit" value="Confirmar" />
                <input className='form_btn_limpiar' type="reset" value="Limpiar" />
            </fieldset>
        </form>:<></>
    </>
}

export default FormulatioAlumno;