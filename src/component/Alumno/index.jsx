/* eslint-disable react/prop-types */
import './Alumno.css'
import { useEffect } from 'react';

const Alumno = (props) => {
  const {manejoLogout, datosAlumnoConectado} = props;

  //Controla el tiempo de inactividad. Desconecta luego de un cierto tiempo
  useEffect(() => {
    let ultimoTiempoActividad = Date.now();

    const actualizaTiempoUltimaActividad = () => {
        ultimoTiempoActividad = Date.now();
    };

    document.addEventListener('mousemove', actualizaTiempoUltimaActividad);
    document.addEventListener('keydown', actualizaTiempoUltimaActividad);

    const interval = setInterval(() => {
        if (Date.now() - ultimoTiempoActividad > 30000) {
            alert("Se agotó el tiempo. Usuario inactivo");
            manejoLogout();
        }
    }, 6000); // Verifica la actividad cada 60 segundos

    // Limpia los eventos y el intervalo al desmontar el componente
    return () => {
        document.removeEventListener('mousemove', actualizaTiempoUltimaActividad);
        document.removeEventListener('keydown', actualizaTiempoUltimaActividad);
        clearInterval(interval);
    };
  }, [manejoLogout]); // Dependencia para asegurarse de que useEffect se ejecute solo cuando manejoLogout cambie

  return (
    <div className='alumno'>
      <nav className="nav_bar">
        <div className='nav_logo'>
            <img className='logo_img' src="logo_borras.svg" alt="" />
            <div className='logo_texto'>
                <h1 className='texto_h1'>BORRAS FRANCO</h1>
                <h5 className='texto_h5'>PROF. EDUCACION FISICA</h5>
            </div>
        </div>

        <div className='nav_boton'>
            <button onClick={manejoLogout} className='boton_unete'>Log-out</button>
        </div>
      </nav>

      <section className='alumno_visor_pdf'>
      {
        new Date(datosAlumnoConectado.fecha_fin) >= new Date()
        ? <iframe className='alumno_iframe' src={datosAlumnoConectado.link_rutina} title="Visor de PDF" sandbox="allow-scripts allow-same-origin"></iframe>
        : null
      }
      </section>
    </div>
  );
};

export default Alumno;