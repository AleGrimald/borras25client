/* eslint-disable react/prop-types */


const PanelIzqAdmin =(props)=>{
    const {setBtn,valueBtn,btnNombre,condicion,funciones,contenido,clases} = props;

    return <>
        <button className={clases[0]} onClick={()=>{setBtn(!valueBtn)}}>{btnNombre}</button>
        <span className={clases[1]}>
            {
                condicion?
                    <ul className={clases[2]}>
                        {
                            contenido.map((cont,index)=><li key={index} onClick={funciones[index]} className={clases[3]}>{cont}</li>)
                        }
                        
                    </ul>
                :<></>
            }
        </span>
    </>
}

export default PanelIzqAdmin;