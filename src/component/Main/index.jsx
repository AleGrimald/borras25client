import './Main.css';
import CarrucelLetras from '../CarrucelLetras';

const Main = ()=>{
    //const { } = props;

    return<>
        <section className='contenedor_datos'>
            <article className='datos_aticle'>
                <h3 className='datos_titulo_h3'>500+</h3>
                <h6 className='datos_titulo_h6'>Clientes Satisfechos</h6>
            </article>
            <article className='datos_aticle'>
                <h3 className='datos_titulo_h3'>100%</h3>
                <h6 className='datos_titulo_h6'>Resultados Garantizados</h6>
            </article>
            <article className='datos_aticle'>
                <h3 className='datos_titulo_h3'>10+</h3>
                <h6 className='datos_titulo_h6'>Años de Experiencia</h6>
            </article>
        </section>

        <section className='contenedor_video_banner'>
            <video className='video_banner' src="video_banner.mp4" autoPlay muted loop/>
        </section>
        
        <CarrucelLetras/>
        <section className='contenedor_planes'>
            <h2 className='planes_titulo_h2'>Planes Disponibles</h2>
            <div className='contenedor_planes_articulos'>
                <article className='planes_articulo'>
                    <div className='articulo_contenedor_titulo'>
                        <h3 className='planes_titulo_h3'>Plan Basico</h3>
                        <h6 className='planes_titulo_h6'>$4.99/mes</h6>
                    </div>
                    <div className='articulo_contenedor_texto'>
                        <p className='planes_texto_p'>Ideal para principiantes que buscan empezar su viaje fitness.</p>
                    </div>
                    <div className='articulo_contenedor_boton'>
                        <button className='planes_boton'>SOLICITA TU PLAN AHORA</button>
                    </div>
                </article>

                <article className='planes_articulo'>
                    <div className='articulo_contenedor_titulo'>
                        <h3 className='planes_titulo_h3'>Plan Avanzado</h3>
                        <h6 className='planes_titulo_h6'>$9.99/mes</h6>
                    </div>
                    <div className='articulo_contenedor_texto'>
                        <p className='planes_texto_p'>Para quienes desean llevar su entrenamiento al siguiente nivel.</p>
                    </div>
                    <div className='articulo_contenedor_boton'>
                        <button className='planes_boton'>SOLICITA TU PLAN AHORA</button>
                    </div>
                </article>

                <article className='planes_articulo'>
                    <div className='articulo_contenedor_titulo'>
                        <h3 className='planes_titulo_h3'>Plan Elite</h3>
                        <h6 className='planes_titulo_h6'>$19.99/mes</h6>
                    </div>
                    <div className='articulo_contenedor_texto'>
                        <p className='planes_texto_p'>Entrenamiento intensivo con seguimiento personalizado y asesoría continua.</p>
                    </div>
                    <div className='articulo_contenedor_boton'>
                        <button className='planes_boton'>SOLICITA TU PLAN AHORA</button>
                    </div>
                </article>
            </div>
            

            
        </section>
        
    </>
}

export default Main;