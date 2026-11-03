import './GeneradorPortada.css'
// Generador de hash para convertir cadenas de texto a semillas numéricas
const generarHash = (str) => {
    let h = 0x811c9dc5;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h;
};

// Generador pseudoaleatorio Mulberry32
const mulberry32 = (a) => {
    return function () {
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const GeneradorPortada = ({ semilla = "default" }) => {
    const semillaNumerica = generarHash(semilla);
    const rand = mulberry32(semillaNumerica);

    // Lista de 8 tokens CSS. Puedes reemplazar los valores de respaldo (#...) con los tuyos reales.
    const paletaTokens = [
        "var(--portada-1)",
        "var(--portada-2)",
        "var(--portada-3)",
        "var(--portada-4)",
        "var(--portada-5)",
        "var(--portada-6)",
        "var(--fijo-negro)",
        "var(--fijo-blanco)",
    ];

    // Seleccionar 3 colores únicos aleatoriamente de la paleta
    let coloresDisponibles = [...paletaTokens];
    const colorFondo = coloresDisponibles.splice(Math.floor(rand() * coloresDisponibles.length), 1)[0];
    const colorPrincipal = coloresDisponibles.splice(Math.floor(rand() * coloresDisponibles.length), 1)[0];
    const colorSecundario = coloresDisponibles.splice(Math.floor(rand() * coloresDisponibles.length), 1)[0];

    // Seleccionar una de las 4 plantillas
    const indicePlantilla = Math.floor(rand() * 4);
    const idClip = `clip-portada-${semillaNumerica}`;

    const renderizarPlantilla = () => {
        switch (indicePlantilla) {
            case 0:
                // Plantilla 1: Círculo inferior centrado y círculo pequeño superior
                return (
                    <>
                        <rect width="100" height="100" fill={colorFondo} />
                        <circle cx="50" cy="100" r="50" fill={colorPrincipal} />
                        <circle cx="75" cy="25" r="12" fill={colorSecundario} />
                    </>
                );
            case 1:
                // Plantilla 2: Arcos concéntricos en la esquina inferior derecha
                return (
                    <>
                        <rect width="100" height="100" fill={colorFondo} />
                        <circle cx="100" cy="100" r="80" fill="none" stroke={colorPrincipal} strokeWidth="25" />
                        <circle cx="100" cy="100" r="40" fill="none" stroke={colorPrincipal} strokeWidth="25" />
                    </>
                );
            case 2:
                // Plantilla 3: Cuadrícula de 9 círculos con colores intercalados
                return (
                    <>
                        <rect width="100" height="100" fill={colorFondo} />
                        {[...Array(9)].map((_, i) => {
                            const fila = Math.floor(i / 3);
                            const col = i % 3;
                            const esAlterno = (fila + col) % 2 !== 0;
                            return (
                                <circle
                                    key={i}
                                    cx={20 + col * 30}
                                    cy={20 + fila * 30}
                                    r="9"
                                    fill={esAlterno ? colorPrincipal : colorSecundario}
                                />
                            );
                        })}
                    </>
                );
            case 3:
                // Plantilla 4: Patrón de franjas diagonales
                const patronId = `franjas-${semillaNumerica}`;
                return (
                    <>
                        <defs>
                            <pattern
                                id={patronId}
                                width="28"
                                height="28"
                                patternTransform="rotate(45)"
                                patternUnits="userSpaceOnUse"
                            >
                                <rect width="14" height="28" fill={colorPrincipal} />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill={colorFondo} />
                        <rect width="100" height="100" fill={`url(#${patronId})`} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <svg
            viewBox="0 0 100 100"
            className='portada'
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderizarPlantilla()}
        </svg>
    );
};

export default GeneradorPortada;