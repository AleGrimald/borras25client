/* eslint-disable react/prop-types */

import { useState } from 'react';
import './ModalListaAlumnos.css';

const ModalListaAlumnos = (props) =>{
    const {usuario, setHabilitarModal, link} = props;
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState();

    const manejoCambioSelect=(e)=>{
        setAlumnoSeleccionado(e.target.value);
    }

    const manejoSubmitAsignacion =async (e)=>{
        e.preventDefault();

        if (!alumnoSeleccionado) {
            console.log("Por favor, selecciona un alumno.");
            return;
        }

        const datos ={
            id: parseInt(alumnoSeleccionado),
            link: link
        };

        try {
            const response = await fetch('https://borras25server.vercel.app/asignar_rutina', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                console.log("¡Rutina asignada exitosamente!");
            } else {
                console.log("Error al asignar la rutina.");
            }
        }catch (error) {
            console.log(`Error: ${error}`);
        }
        setHabilitarModal(false);
    }

    return <div className='modal_lista_alumnos'>
        <form onSubmit={manejoSubmitAsignacion}>
            <legend>Selecciona un alumno</legend>
            <select onChange={manejoCambioSelect} value={alumnoSeleccionado} name="" id="">
                <option>Selecciona un alumno</option>
                {
                    usuario.map((user, key)=><option key={key} value={user.id_cliente}>
                        {user.nombreCliente}
                    </option>)
                }
            </select>
            <input type="submit" value="Confirmar" className='btn-confirmar' />
            <input type="reset" value="Cancelar" className='btn-confirmar' onClick={()=>setHabilitarModal(false)}/>
        </form>
    </div>


}

export default ModalListaAlumnos;