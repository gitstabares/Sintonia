import useTextos from "./hooks/useTextos.js";
import "./App.css"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPublico from "./layouts/LayoutPublico.jsx";
import Home from "./pages/Home/Home.jsx";
import Catalogo from "./pages/Catalogo/Catalogo.jsx";

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
    const enlaces = {
        inicio: '/',
        catalogo: '/catalogo',
        ingresar: '/iniciarSesion',
        crearCuenta: '/crearCuenta',
        terminos: '/terminos',
        accesibilidad: '/accesibilidad'
    }

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
            <Routes>
                <Route path="/" element={<LayoutPublico
                    datos={datos}
                    en={en}
                    alternarIdioma={() => setIdioma(en ? 'es' : 'en')}
                    alternarTexto={() => setTextoGrande(!textoGrande)}
                    enlaces={enlaces}
                />}>
                    <Route index element={<Home
                        datos={datos}
                        en={en}
                        enlaces={enlaces}
                    />} />
                    <Route
                        path={`${enlaces['catalogo']}/:gen_id?`}
                        element={<Catalogo
                            datos={datos}
                            en={en}
                            enlaces={enlaces}
                        />}
                    />
                </Route>
            </Routes>
        </div>
    );
}
export default App;