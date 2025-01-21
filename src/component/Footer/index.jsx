import NavRedes from '../NavRedes';
import './Footer.css';

const Footer = ()=>{

    return<footer className='footer'>
        <div className='nav_logo_footer'>
            <img className='logo_img' src="logo_borras.svg" alt="" />
            <div className='logo_texto'>
                <h2 className='footer_h2'>BORRAS FRANCO</h2>
                <h5 className='footer_h5'>PROF. EDUCACION FISICA</h5>
            </div>
        </div>
        <NavRedes/>
    </footer>
}

export default Footer;