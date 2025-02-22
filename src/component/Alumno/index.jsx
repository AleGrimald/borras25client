/* eslint-disable react/prop-types */
import './Alumno.css'

const Alumno = (props) => {
  const {manejoLogin, datosAlumnoConectado} = props;

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
            <button onClick={manejoLogin} className='boton_unete'>Log-out</button>
        </div>
      </nav>

      <iframe src={datosAlumnoConectado.link_rutina} width="100%" height="500px" title="Visor de PDF" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
  );
};

export default Alumno;