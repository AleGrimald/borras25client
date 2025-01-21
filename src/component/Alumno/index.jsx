import './Alumno.css'
import { useEffect, useState } from 'react';

const Alumno = (props) => {
  const {manejoLogin} = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const urlP = 'https://borras25server.vercel.app/alumno';
    //const url = 'http://localhost:3000/alumno';

    fetch(urlP)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


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

      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id_cliente}>
            {user.id_cliente} - {user.apellido} - {user.nombreCliente} - {user.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alumno;