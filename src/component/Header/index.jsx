import './Header.css';
import NavBar from '../NavBar';

const Header = (props)=>{
    const {manejoLogin, estado} = props;
    
    return<header className='header'>
        <NavBar manejoLogin = {manejoLogin} clase="header_nav" estado={estado}/>

        <section className='header_section'>
            <div className='section_texto'>
                <h2 className='texto_h2'>¡Transforma Tu Cuerpo!</h2>
                <p className='texto_p'>Conviértete en la mejor versión de ti mismo con nuestro entrenamiento personalizado.</p>
            </div>

            <div className='section_boton'>
                <a href='https://wa.me/3816335140' className='boton_contacto'>CONTACTAME AHORA</a>
            </div>
        </section>
    </header>
}

export default Header;