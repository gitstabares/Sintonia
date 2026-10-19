import "./Navbar.css";
import Icono from "./Icono"
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logos/logo.svg"

const DESTINOS = {
    descubrir: "#descubrir",
    planes: "#planes",
    paraArtistas: "#paraArtistas",
    ayuda: "#ayuda"
};

export const Navbar = ({ textos, cargando, error, idioma, cambiarIdioma, activo, onBuscar, textoGrande, alternarTexto }) => {
    const [abierto, setAbierto] = useState(false); // Saber si el toogle de mobile esta abierto
    const [busqueda, setBusqueda] = useState(""); //Sin valor a buscar
    const botonMenu = useRef(null);
    const campoBusqueda = useRef(null);
    const nav = textos?.navbar;
    const ingles = idioma === "en";

    const abrir =
        textos?.menuMovil.abrir ?? (ingles ? "Open menu" : "Abrir menu");
    const cerrar =
        textos?.menuMovil.cerrar ?? (ingles ? "Close menu" : "Cerrar menu");

    const enlaces = Object.entries(nav?.enlaces?.invitado ?? {}).filter(
        ([clave]) => DESTINOS[clave],
    );

    //Abrir y cerrar el menu toogle en vista mobile
    useEffect(() => {
        function cerrarConEscape(evento) {
            if (!abierto) return; //Unicamnete se registre el listener mientras el menu este abierto
            if (evento.key === "Escape" && abierto) {
                setAbierto(false); // Cierra el menu
                botonMenu.current?.focus(); // devuelve el foco al boton del menu
            }
        }
        document.addEventListener("keydown", cerrarConEscape); //Escucha las teclas en todo el documento
        return () => document.removeEventListener("keydown", cerrarConEscape);
    }, [abierto]);
    // Campo para buscar cualquier palabra o frase dentro de nuestro sitio
    function abrirBusqueda(evento) {
        setAbierto(true);
        requestAnimationFrame(() => campoBusqueda.current?.focus());
    }
    function buscar(evento) {
        evento.preventDefault(); // cancelar la accion que el navegador haria por defecto antes ese evento
        const consulta = busqueda.trim();
        if (!consulta) return;
        onBuscar(consulta);
        setAbierto(false);
    }
    return (
        <header className="navbar">
            <nav
                className="navbar-interior"
                aria-label={nav?.aria.menu ?? "Navegación principal"}
            >
                <a
                    href="#inicio"
                    className="navbar-marca"
                    aria-label={nav?.logo.aria ?? "Inicio"}
                    onClick={() => setAbierto(false)}
                >
                    <img src={Logo} alt="" />
                </a>

                {/* Acciones del navbar movil */}
                <div className="navbar-movil-acciones">
                    <button
                        type="button"
                        className="navbar-icono"
                        aria-label={nav?.buscador.aria ?? "Buscar"}
                        onClick={abrirBusqueda}
                    >
                        <Icono nombre="buscar" />
                    </button>
                    {/* Seccion de favoritos */}
                    {nav && (
                        <a
                            className="navbar-icono"
                            href="#favoritos"
                            aria-label={nav.botones.favoritos}
                            onClick={() => setAbierto(false)}
                        >
                            <Icono nombre="favoritos" />
                        </a>
                    )}
                    <button
                        type="button"
                        ref={botonMenu}
                        className="navbar-icono"
                        aria-label={abierto ? cerrar : abrir}
                        aria-expanded={abierto}
                        aria-controls="navbar-panel"
                        onClick={() => setAbierto((valor) => !valor)}
                    >
                        <Icono nombre={abierto ? "cerrar" : "menu"} />
                    </button>
                </div>

                <div id="navbar-panel" className={`navbar-panel${abierto ? " is-abierto" : ""}`} aria-busy={cargando}>
                    {cargando && <p className="navbar-estado" role="status">{ingles ? "Loading navigation…" : "Cargando navegación…"}</p>}
                    {error && <div className="navbar-estado" role="alert"><p>{ingles ? "Navigation could not be loaded." : "No pudimos cargar el menú."}</p><button type="button" onClick={recargar}>{ingles ? "Try again" : "Reintentar"}</button></div>}
                    {nav && <>
                        <ul className="cuerpo-p-fuerte navbar-enlaces">
                            {enlaces.map(([clave, etiqueta]) => <li key={clave}><a href={DESTINOS[clave]} aria-current={activo === clave ? "page" : undefined} onClick={() => setAbierto(false)}>{etiqueta}</a></li>)}
                        </ul>
                    </>}
                    <div className="navbar-utilidades">
                        <label className="cuerpo-p-fuerte navbar-idioma"><Icono nombre="idioma" /><select value={idioma} onChange={(evento) => cambiarIdioma(evento.target.value)} aria-label={nav?.aria.idioma ?? "Cambiar idioma"}><option value="es">ES</option><option value="en">EN</option></select></label>
                        <button className="navbar-icono navbar-accesibilidad" type="button" aria-label={ingles ? "Enlarge text" : "Aumentar texto"} aria-pressed={textoGrande} onClick={alternarTexto}><Icono nombre="accesibilidad" /></button>
                    </div>
                    {nav && <a className="boton-fantasma cuerpo-p-fuerte" href="#ingresar" onClick={() => setAbierto(false)}>{nav.botones.invitado.ingresar}</a>}
                    {nav && <a className="boton-principal cuerpo-p-fuerte" href="#crearCuenta" onClick={() => setAbierto(false)}>{nav.botones.invitado.crearCuenta}</a>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;