/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const FormulatioEditarA=(porps)=>{
    const {dat, reiniciarMain}=porps;

    const [idCliente, setIdCliente] = useState("");
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

    useEffect(()=>{
        if (dat && dat.length > 0)
        {
            console.log("useEffect del Editar")
            setIdCliente(dat[0].id_cliente);
            setApellido(dat[0].apellido);
            setNombre(dat[0].nombreCliente);
            setDni(dat[0].dni);
            setEdad(dat[0].edad);
            setTelefono(dat[0].telefono);
            setEmail(dat[0].correo);
            setPais(dat[0].pais);
            setProvincia(dat[0].provincia);
            setDepartamento(dat[0].departamento);
            setLocalidad(dat[0].localidad);
            setCalle(dat[0].calle);
            setNumero(dat[0].numero);
            setPiso(dat[0].piso);
            setDpto(dat[0].dpto);
            setUsuarioInp(dat[0].usuario);
            setContraseña(dat[0].passw);
            setConfContraseña(dat[0].pasww);

            const fechaFormateada = dat[0].fecha_inicio.split('T')[0];
            setFechaI(fechaFormateada);

            const fechaInicio = new Date(fechaI);
            const fechaFin = new Date(fechaInicio);
            fechaFin.setDate(fechaFin.getDate() + 30);
            setFechaF(fechaFin.toISOString().split('T')[0]);

            switch (dat[0].nombre) {
                case "Basico": setOpcionPlan("1");break;
                case "Competitivo": setOpcionPlan("2");break;
                case "Profesional": setOpcionPlan("3");break;
                default:setOpcionPlan("0"); break;
            }
        }else{
            return
        }

    },[dat, fechaI]);

    const manejoFormularioEditar = async (e)=>{
        e.preventDefault();
        let datos={};
        console.log("Manejo Form Editar se esta ejecutando")
        if(contraseña===confContraseña){
            switch(opcionPlan){
                case "Basico": setOpcionPlan("1"); break;
                case "Competitivo": setOpcionPlan("2"); break;
                case "Profesional": setOpcionPlan("3"); break;
            }

            console.log("Editando Datos")
            datos = {
                id: parseInt(idCliente),
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
                estado: "Pagado",
                plan: parseInt(opcionPlan),
            }

            console.log("Datos editados y cargados: ",datos);
            
            try {
                const response = await fetch('https://borras25server.vercel.app/actualizar_usuario_cliente', {
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
            }catch (error) {
                console.log(`Error al editar los datos: ${error}`);
            }
        }
    }

    return <>
        <form onSubmit={manejoFormularioEditar} action="" className='form'>
            <h2 className='form_h2'>Formulario de Actualizacio</h2>
            <fieldset className='form_field'>
                <legend className='form_legend'>Datos Personales</legend>
                <div className='form_div'>
                    <label htmlFor="apellido">Apellido *</label>
                    <input value={dat?apellido:""} onChange={(e) => setApellido(e.target.value)} type="text" name="apellido" id="apellido" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="nombre">Nombre *</label>
                    <input value={dat?nombre:""} onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="dni">Dni *</label>
                    <input value={dat?dni:""} onChange={(e) => setDni(e.target.value)} type="text" name="dni" id="dni" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="edad">Edad *</label>
                    <input value={dat?edad:""} onChange={(e) => setEdad(e.target.value)} type="text" name="edad" id="edad" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="telefono">Telefono *</label>
                    <input value={dat?telefono:""} onChange={(e) => setTelefono(e.target.value)} type="text" name="telefono" id="telefono" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="email">Email *</label>
                    <input value={dat?email:""} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required/>
                </div>
                <fieldset className='form_field'>
                    <legend className='form_legend'>Direccion</legend>
                    <div className='form_div'>
                        <label htmlFor="pais">Pais *</label>
                        <input value={dat?pais:""} onChange={(e) => setPais(e.target.value)} type="text" name="pais" id="pais" required/>
                    </div>
                    <div className='form_div'>
                        <label htmlFor="provincia">Provincia *</label>
                        <input value={dat?provincia:""} onChange={(e) => setProvincia(e.target.value)} type="text" name="provincia" id="provincia" required/>
                    </div>
                    <div className='form_div'>
                        <label htmlFor="departamento">Departamento</label>
                        <input value={dat?departamento:""} onChange={(e) => setDepartamento(e.target.value)} type="text" name="departamento" id="departamento" />
                    </div>
                    <div className='form_div'>
                        <label htmlFor="localidad">Localidad</label>
                        <input value={dat?localidad:""} onChange={(e) => setLocalidad(e.target.value)} type="text" name="localidad" id="localidad" />
                    </div>
                    <div className='form_div'>
                        <label htmlFor="calle">Calle *</label>
                        <input value={dat?calle:""} onChange={(e) => setCalle(e.target.value)} type="text" name="calle" id="calle" required/>
                    </div>
                    <div className='form_div'>
                        <label htmlFor="numero">Numero *</label>
                        <input value={dat?numero:""} onChange={(e) => setNumero(e.target.value)} type="number" name="numero" id="numero+" required/>
                    </div>
                    <div className='form_div'>
                        <label htmlFor="piso">Piso</label>
                        <input value={dat?piso:""} onChange={(e) => setPiso(e.target.value)} type="text" name="piso" id="piso" />
                    </div>
                    <div className='form_div'>
                        <label htmlFor="dpto">Dpto</label>
                        <input value={dat?dpto:""} onChange={(e) => setDpto(e.target.value)} type="text" name="dpto" id="dpto" />
                    </div>
                </fieldset>
            </fieldset>

            <fieldset className='form_field'>
                <legend className='form_legend'>Datos de Usuario</legend>
                <div className='form_div'>
                    <label htmlFor="usuario">Usuario *</label>
                    <input value={dat?usuarioInp:""} onChange={(e) => setUsuarioInp(e.target.value)} type="text" name="usuario" id="usuario" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="contraseña">Contraseña *</label>
                    <input value={dat?contraseña:""} onChange={(e) => setContraseña(e.target.value)} type="password" name="contraseña" id="contraseña" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="confContraseña">Confirmar Contraseña *</label>
                    <input value={confContraseña||""} onChange={(e) => setConfContraseña(e.target.value)} type="password" name="confContraseña" id="confContraseña" required/>
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
                <input onClick={reiniciarMain} className='form_btn_limpiar' type="reset" value="Cancelar" />
            </fieldset>
        </form>
    </>
}

export default FormulatioEditarA;