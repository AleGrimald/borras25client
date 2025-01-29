/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ListaAlumnos.css";
import ModalFormulario from "../ModalFormularios";

const ListaAlumnos =(props)=>{
    const {usuarios, editar, actualizar, actualizarValue} = props;

    const [buscar, setBuscar] = useState("");
    const [listaEncontrados, setListaEncontrados] = useState([]);
    const [manejoLista, setManejoLista] = useState(false);

    const [modal, setModal] = useState(false);
    const [idClient, setIdCliente]=useState();

    const manejoEditar =(user)=>{
        editar(user.apellido,user.nombreCliente,user.telefono);
    }

    const manejoEliminar=(user)=>{
        setIdCliente(user.id_cliente);
        setModal(true);
    }

    const volverLista= async()=>{
        try {
            const response = await fetch('https://borras25server.vercel.app/eliminar_usuario_cliente', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_cliente: idClient })
            });
        
            if (response.ok) {
                console.log("¡Usuario y Cliente eliminado exitosamente!");
            } else {
                console.log("Error al eliminar los datos.");
            }
        } catch (error) {
            console.log(`Error al eliminar los datos: ${error}`);
        }
        
        actualizar(!actualizarValue);
        setModal(false);
    }

    const buscarAlumno=(e)=>{
        if(e.key === "Enter"){
            const encontrado = usuarios.filter(user=>
                user.apellido === buscar ||
                user.nombreCliente === buscar ||
                user.dni === buscar
            );
            setManejoLista(true);
            setListaEncontrados(encontrado);
        }
    }

    return <>
        <div className="contenedor_buscar">
            <label className="lblBuscar" htmlFor="buscar">Buscar:</label>
            <input 
                type="search" 
                name="buscar" 
                id="buscar" 
                onChange={(e)=>{
                    if(document.querySelector("#buscar").value === ""){
                        setManejoLista(false);
                    }else{
                        setBuscar(e.target.value);
                    }
                }} 
                onKeyPress={buscarAlumno}
            />
        </div>

        {modal?<ModalFormulario volverLista={volverLista} nombre="eliminado"/>:<></>}
        {
            manejoLista?
                listaEncontrados.map((user, index) =>
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
                            <button onClick={()=>manejoEditar(user)} className='alumno_btn_editar'>Editar</button>
                            <button onClick={()=>manejoEliminar(user)} className='alumno_btn_borrar'>Borrar</button>
                        </section>
                </article>
            )
            :usuarios.sort((a,b)=> a.apellido.localeCompare(b.apellido)).map((user, index) =>
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
                        <button onClick={()=>manejoEditar(user)} className='alumno_btn_editar'>Editar</button>
                        <button onClick={()=>manejoEliminar(user)} className='alumno_btn_borrar'>Borrar</button>
                    </section>
                </article>
            )
        }
    </>
}

export default ListaAlumnos;