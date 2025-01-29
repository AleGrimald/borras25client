/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import ModalFormulario from "../ModalFormularios";

const FormulatioEjercicio=(porps)=>{
    const {usuario, setForm, actualizar, actualizarValue, lista}=porps;

    const [nombreE, setNombreE] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [modal, setModal] = useState(false);

    const manejoFormulario = async (e)=>{
        e.preventDefault();
        let datos={
            nombre: nombreE,
            descr: descripcion
        };
        try {
            const response = await fetch('https://borras25server.vercel.app/agregar_ejercicio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            if (response.ok) {
                console.log("¡Usuario y Cliente agregados exitosamente!");
            } else {
                console.log("Error al enviar los datos.");
            }
        }catch (error) {
            console.log(`Error al enviar los datos: ${error}`);
        }
        setModal(true);
    }

    const manejoFormReset =()=>{
        setDescripcion("");
        setNombreE("");
    }

    const volverLista=()=>{
        actualizar(!actualizarValue);
        lista(true);
        setForm(false);
    }

    const validarLetra=(set,e)=>{
        if(!(/[^A-Za-z.-\s]/.test(e.target.value))){
            set(e.target.value);
        }
    }

    return <>
        {
            modal?<ModalFormulario volverLista={volverLista} nombre="agregado"/>:<></>
        }
        <form onReset={manejoFormReset} onSubmit={manejoFormulario} action="" className='form'>
            <h2 className='form_h2'>Formulario de Ejercicios</h2>
            <fieldset className='form_field'>
                <legend className='form_legend'>Datos del Ejercicio</legend>
                <div className='form_div'>
                    <label htmlFor="nombre_ejercicio">Nombre *</label>
                    <input onChange={(e) => validarLetra(setNombreE,e)} value={nombreE} type="text" name="nombre_ejercicio" id="nombre_ejercicio" required/>
                </div>
                <div className='form_div'>
                    <label htmlFor="descripcion">Descripcion *</label>
                    <textarea onChange={(e) => validarLetra(setDescripcion,e)} name="descripcion" id="descripcion" value={descripcion} required></textarea>
                </div>
            </fieldset>
            <fieldset className='form_field form_field_btn'>
                <input className='form_btn_confirmar' type="submit" value="Confirmar" />
                <input className='form_btn_limpiar' type="reset" value="Cancelar" />
            </fieldset>
        </form>:<></>
    </>
}

export default FormulatioEjercicio;