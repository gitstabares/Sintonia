import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { validarCredenciales } from '../../utils/sesion.js';
import { obtenerAvisoIngreso } from '../../utils/erroresIngreso.js';
import Icono from '../Icono.jsx';
import './FormularioSesion.css';

export default function FormularioSesion({
  textos, textosApi, enviando, error, bloqueado, segundosRestantes,
  alEnviar, enlaceCrearCuenta, enlaceRecuperar,
}) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [recordar, setRecordar] = useState(true);
  const [errores, setErrores] = useState({});
  const correoRef = useRef(null);
  const contrasenaRef = useRef(null);
  const envioPendiente = useRef(false);
  const deshabilitado = enviando || bloqueado;
  const aviso = obtenerAvisoIngreso(textosApi, error, segundosRestantes);

  const enviar = async evento => {
    evento.preventDefault();
    if (envioPendiente.current || deshabilitado) return;
    const campos = { correo, contrasena };
    const erroresValidacion = validarCredenciales(campos);
    setErrores(erroresValidacion);
    if (erroresValidacion.correo) {
      correoRef.current?.focus();
      return;
    }
    if (erroresValidacion.contrasena) {
      contrasenaRef.current?.focus();
      return;
    }
    envioPendiente.current = true;
    try {
      await alEnviar(campos, recordar);
    } finally {
      envioPendiente.current = false;
    }
  };

  const alCambiarCorreo = evento => {
    setCorreo(evento.target.value);
    if (errores.correo) setErrores(actual => ({ ...actual, correo: null }));
  };
  const alCambiarContrasena = evento => {
    setContrasena(evento.target.value);
    if (errores.contrasena) setErrores(actual => ({ ...actual, contrasena: null }));
  };

  return (
    <form className="formulario-sesion" onSubmit={enviar} noValidate aria-busy={enviando}>
      {error && aviso && (aviso.titulo || aviso.texto) && (
        <div className="formulario-sesion__aviso"
          role={aviso.tipo === 'limite' ? 'status' : 'alert'}
          aria-live={aviso.tipo === 'limite' ? 'polite' : 'assertive'}>
          <Icono nombre="alert" aria-hidden="true" className="formulario-sesion__icono-alerta" />
          <div className="formulario-sesion__aviso-contenido">
            {aviso.titulo && <strong className="cuerpo-p-fuerte">{aviso.titulo}</strong>}
            {aviso.texto && <p className="cuerpo-p">{aviso.texto}</p>}
          </div>
        </div>
      )}

      <div className="formulario-sesion__campo">
        <label className="cuerpo-p-fuerte" htmlFor="inicio-sesion-correo">{textos.correo}</label>
        <input
          id="inicio-sesion-correo"
          ref={correoRef}
          type="email"
          name="correo"
          autoComplete="username"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={textos.correoPlaceholder}
          value={correo}
          onChange={alCambiarCorreo}
          required
          aria-required="true"
          aria-invalid={Boolean(errores.correo)}
          aria-describedby={errores.correo ? 'inicio-sesion-correo-error' : undefined}
          disabled={deshabilitado}
        />
        {errores.correo && (
          <p className="formulario-sesion__error detalle-nota" id="inicio-sesion-correo-error" role="alert">
            {errores.correo === 'formato' ? textos.formato : (textos.correoObligatorio ?? textos.obligatorio)}
          </p>
        )}
      </div>

      <div className="formulario-sesion__campo">
        <label className="cuerpo-p-fuerte" htmlFor="inicio-sesion-contrasena">{textos.contrasena}</label>
        <div className="formulario-sesion__contrasena">
          <input
            id="inicio-sesion-contrasena"
            ref={contrasenaRef}
            type={mostrarContrasena ? 'text' : 'password'}
            name="contrasena"
            autoComplete="current-password"
            placeholder={textos.contrasenaPlaceholder}
            value={contrasena}
            onChange={alCambiarContrasena}
            required
            aria-required="true"
            aria-invalid={Boolean(errores.contrasena)}
            aria-describedby={errores.contrasena ? 'inicio-sesion-contrasena-error' : undefined}
            disabled={deshabilitado}
          />
          <button
            type="button"
            className="formulario-sesion__ojo"
            onClick={() => setMostrarContrasena(actual => !actual)}
            aria-label={mostrarContrasena ? textos.ocultar : textos.mostrar}
            aria-pressed={mostrarContrasena}
            disabled={deshabilitado}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
              {mostrarContrasena && <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>}
            </svg>
          </button>
        </div>
        {errores.contrasena && (
          <p className="formulario-sesion__error detalle-nota" id="inicio-sesion-contrasena-error" role="alert">
            {textos.claveObligatoria ?? textos.obligatorio}
          </p>
        )}
      </div>

      <div className="formulario-sesion__opciones">
        <label className="formulario-sesion__recordar cuerpo-p">
          <input type="checkbox" checked={recordar} onChange={e => setRecordar(e.target.checked)} disabled={deshabilitado}/>
          <span>{textos.recordar}</span>
        </label>
        <Link className="formulario-sesion__enlace cuerpo-p-fuerte" to={enlaceRecuperar}>
          {textos.recuperar}
        </Link>
      </div>

      <button className="formulario-sesion__submit cuerpo-m-fuerte" type="submit" disabled={deshabilitado}>
        {enviando && <span className="formulario-sesion__indicador" aria-hidden="true" />}
        <span aria-live="polite">
          {enviando ? textos.ingresando
            : aviso?.tipo === 'conexion' ? (aviso.reintentar ?? textos.ingresar)
            : textos.ingresar}
        </span>
      </button>

      <p className="formulario-sesion__crear cuerpo-p">
        <span>{textos.sinCuenta} </span>
        <Link className="formulario-sesion__enlace cuerpo-p-fuerte" to={enlaceCrearCuenta}>{textos.crear}</Link>
      </p>
    </form>
  );
}
