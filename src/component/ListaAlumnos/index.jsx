/* eslint-disable react/prop-types */
const ListaAlumnos =(props)=>{
    const {usuarios, editar} = props;

    const manejoEditar =(user)=>{
        editar(user.apellido,user.nombreCliente,user.telefono);
    }

    return <>
        {
            usuarios.map((user, index) =>
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
                        <button className='alumno_btn_borrar'>Borrar</button>
                    </section>
                </article>
            )
        }
    </>
}

export default ListaAlumnos;