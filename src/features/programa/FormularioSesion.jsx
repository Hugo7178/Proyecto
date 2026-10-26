import { useEffect, useId, useRef, useState } from 'react';
import { DIAS_CONGRESO, SALAS, formatearFecha, nombreDelDia, obtenerEjes, obtenerModeradores } from './programaServicio';
import { validarSesion } from './validaciones';

const EJES = obtenerEjes();
const MODERADORES = obtenerModeradores();

const VACIA = {
  nombre: '',
  eje: '',
  fecha: DIAS_CONGRESO[0],
  horaInicio: '',
  horaFin: '',
  sala: '',
  moderador: '',
};

// Ventana para crear o editar una sesión; valida campo por campo y el cruce de salas.
export default function FormularioSesion({ sesion, otrasSesiones, onGuardar, onCerrar }) {
  const [datos, setDatos] = useState(sesion ?? VACIA);
  const [errores, setErrores] = useState({});
  const ventanaRef = useRef(null);
  const cerrarRef = useRef(onCerrar);
  const id = useId();

  useEffect(() => {
    cerrarRef.current = onCerrar;
  }, [onCerrar]);

  // Foco en el primer campo, Escape cierra y Tab no sale de la ventana.
  useEffect(() => {
    const ventana = ventanaRef.current;
    ventana.querySelector('input, select')?.focus();
    function alPresionar(e) {
      if (e.key === 'Escape') cerrarRef.current();
      if (e.key !== 'Tab') return;
      const enfocables = [...ventana.querySelectorAll('input, select, button')];
      const [primero, ultimo] = [enfocables[0], enfocables[enfocables.length - 1]];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, []);

  function cambiar(e) {
    const { name, value } = e.target;
    setDatos((d) => ({ ...d, [name]: value }));
    if (errores[name] || (errores.horario && ['horaInicio', 'horaFin', 'sala', 'fecha'].includes(name))) {
      setErrores((er) => ({ ...er, [name]: undefined, horario: undefined }));
    }
  }

  function enviar(e) {
    e.preventDefault();
    const limpia = { ...datos, nombre: datos.nombre.trim(), moderador: datos.moderador.trim() };
    const encontrados = validarSesion(limpia, otrasSesiones);
    setErrores(encontrados);
    if (Object.keys(encontrados).length === 0) onGuardar(limpia);
  }

  // Props comunes de cada campo: enlazan el mensaje de error para lectores de pantalla.
  function campo(nombre) {
    return {
      id: `${id}-${nombre}`,
      name: nombre,
      value: datos[nombre],
      onChange: cambiar,
      'aria-invalid': Boolean(errores[nombre]),
      'aria-describedby': errores[nombre] ? `${id}-${nombre}-error` : undefined,
    };
  }

  function error(nombre) {
    return errores[nombre] && (
      <span id={`${id}-${nombre}-error`} className="armado-form-error">{errores[nombre]}</span>
    );
  }

  return (
    <div className="armado-fondo">
      <div className="armado-ventana" ref={ventanaRef} role="dialog" aria-modal="true" aria-labelledby={`${id}-titulo`}>
        <header className="armado-ventana-cabecera">
          <h2 id={`${id}-titulo`}>{sesion ? 'Editar sesión' : 'Nueva sesión'}</h2>
          <button type="button" className="armado-cerrar" aria-label="Cerrar" onClick={onCerrar}>×</button>
        </header>

        <form className="armado-form" onSubmit={enviar} noValidate>
          <div className="armado-form-campo armado-form-ancho">
            <label htmlFor={`${id}-nombre`}>Nombre de la sesión</label>
            <input type="text" maxLength={80} {...campo('nombre')} />
            {error('nombre')}
          </div>

          <div className="armado-form-campo armado-form-ancho">
            <label htmlFor={`${id}-eje`}>Eje temático</label>
            <select {...campo('eje')}>
              <option value="">Elija un eje</option>
              {EJES.map((e) => <option key={e}>{e}</option>)}
            </select>
            {error('eje')}
          </div>

          <div className="armado-form-campo">
            <label htmlFor={`${id}-fecha`}>Fecha</label>
            <select {...campo('fecha')}>
              {DIAS_CONGRESO.map((d) => (
                <option key={d} value={d}>{nombreDelDia(d)} {formatearFecha(d)}</option>
              ))}
            </select>
            {error('fecha')}
          </div>

          <div className="armado-form-campo">
            <label htmlFor={`${id}-sala`}>Sala</label>
            <select {...campo('sala')}>
              <option value="">Elija una sala</option>
              {SALAS.map((s) => <option key={s}>{s}</option>)}
            </select>
            {error('sala')}
          </div>

          <div className="armado-form-campo">
            <label htmlFor={`${id}-horaInicio`}>Hora de inicio</label>
            <input
              type="time"
              step={300}
              {...campo('horaInicio')}
              aria-invalid={Boolean(errores.horario)}
              aria-describedby={errores.horario ? `${id}-horario-error` : undefined}
            />
          </div>

          <div className="armado-form-campo">
            <label htmlFor={`${id}-horaFin`}>Hora de fin</label>
            <input
              type="time"
              step={300}
              {...campo('horaFin')}
              aria-invalid={Boolean(errores.horario)}
              aria-describedby={errores.horario ? `${id}-horario-error` : undefined}
            />
          </div>
          {error('horario') && <div className="armado-form-ancho">{error('horario')}</div>}

          <div className="armado-form-campo armado-form-ancho">
            <label htmlFor={`${id}-moderador`}>Moderador</label>
            <input type="text" list={`${id}-moderadores`} maxLength={80} {...campo('moderador')} />
            <datalist id={`${id}-moderadores`}>
              {MODERADORES.map((m) => <option key={m} value={m} />)}
            </datalist>
            {error('moderador')}
          </div>

          <div className="armado-form-acciones armado-form-ancho">
            <button type="button" className="boton-secundario" onClick={onCerrar}>Cancelar</button>
            <button type="submit" className="boton-primario">{sesion ? 'Guardar cambios' : 'Crear sesión'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
