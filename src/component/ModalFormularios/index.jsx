/* eslint-disable react/prop-types */

const ModalFormulario =(props)=>{
    const {volverLista, nombre} = props;

    return<>
        <div className="contenedor_modal">
                <h4 className="modal_h4">¡Alumno {nombre} exitosamente!</h4>
                <h6 className="modal_h6">Presiona aceptar para volver a la Lista.</h6>
                <button onClick={volverLista}>Aceptar</button>
        </div>
    </>
}

export default ModalFormulario;