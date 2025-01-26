

const PanelIzqAdmin =(props)=>{
    const {setBtn,valueBtn,btnNombre,condicion,funciones,contenido,clases} = props;

    return <>
        <button className={clases[0]} onClick={()=>{setBtn(!valueBtn)}}>{btnNombre}</button>
        <span className={clases[1]}>
            {
                condicion?
                    <ul className={clases[2]}>
                        <li onClick={funciones[0]} className={clases[3]}>{contenido[0]}</li>
                        <li onClick={funciones[1]} className={clases[3]}>{contenido[1]}</li>
                    </ul>
                :<></>
            }
        </span>
    </>
}

export default PanelIzqAdmin;