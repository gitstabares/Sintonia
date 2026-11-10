import React from 'react'
import BotonIcono from '../BotonIcono/BotonIcono';

const PanelAccesibilidad = () => {
    accesibilidad = textos?.accesibilidad;
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start', // Posiciona el elemento justo debajo alineado a la izquierda
        whileElementsMounted: autoUpdate, // Recalcula la posición al hacer scroll o resize
        middleware: [
            offset(8), // Espaciado vertical entre botón y flotante
            flip(),   // Cambia hacia arriba si no cabe abajo en el viewport
            shift(),  // Desplaza lateralmente para no salir de los bordes de la pantalla
        ],
    });

    // Interacción para abrir/cerrar al hacer click en el botón
    const click = useClick(context);
    // Interacción para cerrar al hacer click fuera o presionar la tecla Escape
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
    ]);

    return (
        <>
            <BotonIcono ancho={40} tipo="secundario" icono="person"
                aria-label={nav?.aria?.accesibilidad}
                aria-pressed={textoGrande} onClick={alternarTexto}
                ref={refs.setReference} {...getReferenceProps()} />

            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        className='panel-accesibilidad'
                        {...getFloatingProps()}
                    >
                        Contenido del Popover con Floating UI
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}

export default PanelAccesibilidad