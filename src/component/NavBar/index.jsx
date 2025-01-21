import './NavBar.css';
const NavBar = (props)=>{
    const {manejoLogin, clase, estado}=props;

    return <nav className={clase}>
        <div className='nav_logo'>
            <img className='logo_img' src="logo_borras.svg" alt="" />
            <div className='logo_texto'>
                <h1 className='texto_h1'>BORRAS FRANCO</h1>
                <h5 className='texto_h5'>PROF. EDUCACION FISICA</h5>
            </div>
        </div>

        {/*
            <ul className='nav_lista'>
                <li className='lista_li'><a className='li_a' href="">Entrenamiento</a></li>
                <li className='lista_li'><a className='li_a' href="">Nutricion</a></li>
                <li className='lista_li'><a className='li_a' href="">Testimonios</a></li>
            </ul>

            <div className='nav_boton'>
                <button onClick={manejoLogin} className='boton_unete'>{estado?"Log-in":"Home"}</button>
            </div>
        */}
        

        
</nav>
}

export default NavBar;