import { useEffect, useId, useState } from 'react';
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useLocation } from 'react-router-dom';
import BotonIcono from '../BotonIcono/BotonIcono';
import Icono from '../Icono';
import useMediaQuery from '../../hooks/useMediaQuery';
import './PanelAccesibilidad.css';

const OPCIONES = [
  {
    clave: 'textoGrande',
    icono: 'plus',
    es: 'Aumentar tamaño de texto',
    en: 'Increase text size',
    descripcionEs: 'Amplía la tipografía en toda la aplicación.',
    descripcionEn: 'Enlarge text throughout the application.',
  },
  {
    clave: 'altoContraste',
    icono: 'sun',
    es: 'Alto contraste',
    en: 'High contrast',
    descripcionEs: 'Distingue mejor textos, fondos y bordes.',
    descripcionEn: 'Make text, backgrounds and borders easier to see.',
  },
  {
    clave: 'reducirMovimiento',
    icono: 'pause',
    es: 'Reducir movimiento',
    en: 'Reduce motion',
    descripcionEs: 'Desactiva animaciones y transiciones.',
    descripcionEn: 'Disable animations and transitions.',
  },
  {
    clave: 'subrayarEnlaces',
    icono: 'arrowr',
    es: 'Subrayar enlaces',
    en: 'Underline links',
    descripcionEs: 'Identifica los enlaces fácilmente.',
    descripcionEn: 'Make links easier to identify.',
  },
  {
    clave: 'espaciadoLectura',
    icono: 'rows',
    es: 'Espaciado de lectura',
    en: 'Reading spacing',
    descripcionEs: 'Aumenta el espacio entre líneas y palabras.',
    descripcionEn: 'Increase spacing between lines and words.',
  },
];

export default function PanelAccesibilidad({
  textos,
  en = false,
  preferencias,
  onAlternar,
  onRestablecer,
}) {
  const [abierto, setAbierto] = useState(false);
  const movil = useMediaQuery('(max-width: 1023px)');
  const ubicacion = useLocation();
  const idPanel = useId();
  const idTitulo = useId();

  const { refs, floatingStyles, context } = useFloating({
    open: abierto,
    onOpenChange: setAbierto,
    placement: 'bottom-end',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({ fallbackPlacements: ['top-end'] }),
      shift({ padding: 12 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    setAbierto(false);
  }, [ubicacion.pathname, ubicacion.search]);

  const titulo = en ? 'Accessibility' : 'Accesibilidad';
  const subtitulo = en ? 'Customize your experience' : 'Personaliza tu experiencia';
  const cerrar = en ? 'Close accessibility panel' : 'Cerrar panel de accesibilidad';
  const etiquetaBoton = textos?.navbar?.aria?.accesibilidad || (en ? 'Accessibility settings' : 'Opciones de accesibilidad');

  return (
    <>
      <BotonIcono
        ref={refs.setReference}
        ancho={40}
        tipo="secundario"
        icono="person"
        {...getReferenceProps({
          'aria-label': etiquetaBoton,
          'aria-haspopup': 'dialog',
          'aria-expanded': abierto,
          'aria-controls': abierto ? idPanel : undefined,
        })}
      />

      {abierto && (
        <FloatingPortal>
          {movil && (
            <div
              className="panel-accesibilidad__fondo"
              aria-hidden="true"
              onClick={() => setAbierto(false)}
            />
          )}
          <FloatingFocusManager context={context} modal={movil} returnFocus>
            <section
              id={idPanel}
              ref={refs.setFloating}
              className={'panel-accesibilidad' + (movil ? ' panel-accesibilidad--movil' : '')}
              style={movil ? undefined : floatingStyles}
              aria-labelledby={idTitulo}
              {...getFloatingProps()}
            >
              <div className="panel-accesibilidad__encabezado">
                <div>
                  <h2 className="panel-accesibilidad__titulo" id={idTitulo}>{titulo}</h2>
                  <p className="panel-accesibilidad__subtitulo">{subtitulo}</p>
                </div>
                <button className="panel-accesibilidad__cerrar" type="button" onClick={() => setAbierto(false)} aria-label={cerrar}>
                  <Icono nombre="x" aria-hidden="true" />
                </button>
              </div>

              <div className="panel-accesibilidad__opciones">
                {OPCIONES.map(opcion => {
                  const activo = preferencias?.[opcion.clave] === true;
                  const etiqueta = en ? opcion.en : opcion.es;
                  return (
                    <button
                      key={opcion.clave}
                      className={'panel-accesibilidad__opcion' + (activo ? ' panel-accesibilidad__opcion--activa' : '')}
                      type="button"
                      role="switch"
                      aria-checked={activo}
                      aria-label={etiqueta}
                      onClick={() => onAlternar(opcion.clave)}
                    >
                      <span className="panel-accesibilidad__icono" aria-hidden="true">
                        <Icono nombre={opcion.icono} />
                      </span>
                      <span className="panel-accesibilidad__texto">
                        <span className="panel-accesibilidad__etiqueta">{etiqueta}</span>
                        <span className="panel-accesibilidad__descripcion">{en ? opcion.descripcionEn : opcion.descripcionEs}</span>
                      </span>
                      <span className="panel-accesibilidad__interruptor" aria-hidden="true">
                        <span className="panel-accesibilidad__indicador" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="panel-accesibilidad__pie">
                <button className="panel-accesibilidad__restablecer" type="button" onClick={onRestablecer}>
                  {en ? 'Reset settings' : 'Restablecer ajustes'}
                </button>
                <a
                  className="panel-accesibilidad__declaracion"
                  href="#"
                  aria-disabled="true"
                  aria-label={en ? 'Accessibility statement (coming soon)' : 'Declaración de accesibilidad (próximamente)'}
                  onClick={evento => evento.preventDefault()}
                >
                  {en ? 'Accessibility statement' : 'Declaración de accesibilidad'}
                  <Icono nombre="arrowr" aria-hidden="true" />
                </a>
              </div>
            </section>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
