import './Portada.css'

const Portada = ({ patron, fondo, figura, detalle }) => {
    const renderizarPlantilla = () => {
        switch (patron) {
            case 0:
                // Anillos
                return (
                    <>
                        <rect width="176" height="176" fill={fondo} />
                        <circle cx="176" cy="176" r="130" fill="none" stroke={figura} strokeWidth="40" />
                        <circle cx="176" cy="176" r="50" fill="none" stroke={figura} strokeWidth="40" />
                    </>
                );
            case 1:
                // Rayas diagonales
                const patronId = `franjas-${patron}-${fondo}-${figura}-${detalle}`;

                return (
                    <>
                        <rect
                            width="176"
                            height="176"
                            fill={fondo}
                        />
                        <g transform='rotate(-35)'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <rect
                                    key={index}
                                    width="320"
                                    height="20"
                                    fill={figura}
                                    y={20 + index * 40}
                                    style={{ transform: 'translate(-100%, 0)' }}
                                />
                            ))}
                        </g>
                    </>
                );
            case 2:
                // Colina
                return (
                    <>
                        <rect width="176" height="176" fill={fondo} />
                        <circle cx="88" cy="152" r="60" fill={figura} />
                        <circle cx="135" cy="41" r="19" fill={detalle} />
                    </>
                );

            case 3:
                // Puntos
                return (
                    <>
                        <rect width="176" height="176" fill={fondo} />
                        {[...Array(9)].map((_, i) => {
                            const fila = Math.floor(i / 3);
                            const col = i % 3;
                            const esAlterno = (fila + col) % 2 !== 0;
                            return (
                                <circle
                                    key={i}
                                    cx={40 + col * 48}
                                    cy={40 + fila * 48}
                                    r="16"
                                    fill={esAlterno ? figura : detalle}
                                />
                            );
                        })}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <svg
            viewBox="0 0 176 176"
            className='portada'
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderizarPlantilla()}
        </svg>
    );
};

export default Portada;