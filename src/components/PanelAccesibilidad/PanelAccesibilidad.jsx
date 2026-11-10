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
import { TAMANO_TEXTO_MIN, TAMANO_TEXTO_MAX } from '../../utils/accesibilidad.js';
import './PanelAccesibilidad.css';

export default function PanelAccesibilidad({
  textos,
  etiquetaBoton,
  preferencias,
  onAlternar,
  onCambiarTamanoTexto,
  onRestablecer,
}) {
  const [abierto, setAbierto] = useState(false);
  const movil = useMediaQuery('(max-width: 1023px)');
  const ubicacion = useLocation();
  const idPanel = useId();
  const idTitulo = useId();
  const idTamano = useId();
  const txtAcc = textos?.accesibilidad;

  const { refs, floatingStyles, context } = useFloating({
    open: abierto,
    onOpenChange: setAbierto,
    placement: 'bottom-end',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip({ fallbackPlacements: ['top-end'] }), shift({ padding: 12 })],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => setAbierto(false), [ubicacion.pathname, ubicacion.search]);

  // No hay textos de sustitución: todo procede de /textos?seccion=accesibilidad.
  const opciones = [
    { clave: 'altoContraste', etiqueta: txtAcc?.altoContraste?.etiqueta, ayuda: txtAcc?.altoContraste?.ayuda },
    { clave: 'reducirMovimiento', etiqueta: txtAcc?.reducirMovimiento?.etiqueta, ayuda: txtAcc?.reducirMovimiento?.ayuda },
    { clave: 'subrayarEnlaces', etiqueta: txtAcc?.subrayarEnlaces?.etiqueta, ayuda: txtAcc?.subrayarEnlaces?.ayuda },
    { clave: 'espaciado', etiqueta: txtAcc?.espaciado?.etiqueta, ayuda: txtAcc?.espaciado?.ayuda },
  ];

  const porcentaje = txtAcc?.tamanoTexto?.valor?.replace('{valor}', String(preferencias?.tamanoTexto));

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
          disabled: !txtAcc?.titulo,
        })}
      />

      {abierto && (
        <FloatingPortal>
          {movil && (
            <div
              className="panel-accesibilidad-fondo"
              aria-hidden="true"
              onClick={() => setAbierto(false)}
            />
          )}
          <FloatingFocusManager context={context} modal={movil} returnFocus>
            <aside
              id={idPanel}
              ref={refs.setFloating}
              className={'panel-accesibilidad' + (movil ? ' panel-accesibilidad--movil' : '')}
              style={movil ? undefined : floatingStyles}
              {...getFloatingProps({
                'aria-labelledby': idTitulo,
                'aria-modal': movil ? 'true' : undefined,
              })}
            >
              <header className="panel-accesibilidad-encabezado">
                <h2 className="panel-accesibilidad-titulo titular-h3" id={idTitulo}>{txtAcc?.titulo}</h2>
                <button
                  className="panel-accesibilidad-cerrar"
                  type="button"
                  onClick={() => setAbierto(false)}
                  aria-label={txtAcc?.aria?.cerrar}
                >
                  <Icono nombre="x" aria-hidden="true" />
                </button>
              </header>

              <section className="panel-accesibilidad-tamano" aria-labelledby={idTamano}>
                <h3 className="panel-accesibilidad-etiqueta-seccion" id={idTamano}>
                  {txtAcc?.tamanoTexto?.etiqueta}
                </h3>
                <div className="panel-accesibilidad-control-tamano" role="group" aria-labelledby={idTamano}>
                  <button
                    type="button"
                    className="panel-accesibilidad-boton-tamano"
                    aria-label={txtAcc?.tamanoTexto?.reducir}
                    disabled={preferencias?.tamanoTexto <= TAMANO_TEXTO_MIN}
                    onClick={() => onCambiarTamanoTexto(-1)}
                  >
                    &minus;
                  </button>
                  <output className="panel-accesibilidad-valor-tamano" aria-live="polite">
                    {porcentaje}
                  </output>
                  <button
                    type="button"
                    className="panel-accesibilidad-boton-tamano"
                    aria-label={txtAcc?.tamanoTexto?.aumentar}
                    disabled={preferencias?.tamanoTexto >= TAMANO_TEXTO_MAX}
                    onClick={() => onCambiarTamanoTexto(1)}
                  >
                    +
                  </button>
                </div>
              </section>

              <div className="panel-accesibilidad-opciones">
                {opciones.map(opcion => {
                  const activo = preferencias?.[opcion.clave] === true;
                  const idOpcion = idPanel + '-' + opcion.clave;
                  const idAyuda = idOpcion + '-ayuda';
                  return (
                    <div className="panel-accesibilidad-opcion" key={opcion.clave}>
                      <div className="panel-accesibilidad-texto">
                        <h3 className="panel-accesibilidad-etiqueta" id={idOpcion}>{opcion.etiqueta}</h3>
                        <p className="panel-accesibilidad-descripcion" id={idAyuda}>{opcion.ayuda}</p>
                      </div>
                      <button
                        className={'panel-accesibilidad-interruptor' + (activo ? ' panel-accesibilidad-interruptor--activo' : '')}
                        type="button"
                        role="switch"
                        aria-checked={activo}
                        aria-labelledby={idOpcion}
                        aria-describedby={idAyuda}
                        onClick={() => onAlternar(opcion.clave)}
                      >
                        <span className="panel-accesibilidad-indicador" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="panel-accesibilidad-nota detalle-nota">{txtAcc?.mensajes?.nota}</p>

              <footer className="panel-accesibilidad-pie">
                <a
                  className="panel-accesibilidad-declaracion"
                  href="#"
                  aria-disabled="true"
                  onClick={evento => evento.preventDefault()}
                >
                  {txtAcc?.enlaces?.declaracion}
                </a>
                <button className="panel-accesibilidad-restablecer" type="button" onClick={onRestablecer}>
                  {txtAcc?.botones?.restablecer}
                </button>
              </footer>
            </aside>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
