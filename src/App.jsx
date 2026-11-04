import { useTextos } from "./hooks/useTextos.js";
import "./App.css"
import { useEffect, useState } from "react";
import BannerCookies from "./components/BannerCookies/BannerCookies.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function leerSeccion() {
    return window.location.hash.slice(1) || "inicio";
}

function App() {
    const [idioma, setIdioma] = useState("es");
    const [activo, setActivo] = useState(leerSeccion);
    const [consulta, setConsulta] = useState("");
    const [textoGrande, setTextoGrande] = useState(false);
    const datos = useTextos(idioma);

    const en = idioma === "en";

    // Sincroniza el estado del componente con el hash de la url
    useEffect(() => {
        function actualizar() {
            setActivo(leerSeccion());
            setConsulta("");
        }
        window.addEventListener("hashchange", actualizar);
        return () => window.removeEventListener("hashchange", actualizar)
    }, []);

    useEffect(() => { document.documentElement.lang; }, [idioma]);
    useEffect(() => {
        document.documentElement.style.fontSize = textoGrande ? "112%" : "";
        return () => {
            document.documentElement.style.fontSize = "";
        };
    }, [textoGrande]);

    function buscar(valor) {
        setConsulta(valor);
        setActivo("heroes")
        window.history.replaceState(null, "", "#heroes");
    }

    return (
        <div className="sitio">
            <Navbar
                {...datos}
                en={en}
                cambiarIdioma={setIdioma}
                textoGrande={textoGrande}
                alternarTexto={() => setTextoGrande(!textoGrande)}
            />
        </div>
    );
}
export default App;