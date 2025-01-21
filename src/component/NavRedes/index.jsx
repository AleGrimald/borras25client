import './NavRedes.css';

const NavRedes = ()=>{
    return <section className='contenedor_redes'>
        <h2 className='h2_redes'>¡Síguenos en Redes Sociales!</h2>
        <ul className='ul_redes'>
            <a href="https://www.facebook.com/franco.borras"><img className='img_red' src="/facebook.webp" alt="Facebook" /></a>
            <a href="https://www.instagram.com/franco_borras25/"><img className='img_red' src="/ig.png" alt="Instagram" /></a>
            <a href="https://wa.me/3816335140"><img className='img_red' src="/whatsapp.png" alt="Whatsapp" /></a>
        </ul>
    </section>
}

export default NavRedes;