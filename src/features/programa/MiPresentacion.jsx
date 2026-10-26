import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import { getCurrentParticipant } from '../../shared/cuentaServicio';
import { usePrograma } from './programaContexto';
import {
  DURACION_TRABAJO,
  descripcionSala,
  eventoCalendario,
  formatearFecha,
  horaDeTrabajo,
  nombreDelDia,
  presentacionesDe,
} from './programaServicio';
import './MiPresentacion.css';

// 6.4 · Fecha, hora y sala de la presentación del autor.
export default function MiPresentacion() {
  const { sesiones, programa, trabajosAceptados } = usePrograma();
  const { aceptados, presentaciones } = presentacionesDe(getCurrentParticipant(), sesiones, trabajosAceptados);

  // Solo se muestra con trabajo aceptado, sesión asignada y programa publicado.
  let vacio = null;
  if (aceptados.length === 0) {
    vacio = {
      titulo: 'Todavía no tiene una presentación',
      texto: 'Cuando el comité acepte uno de sus trabajos y lo asigne a una sesión, aquí verá la fecha, la hora y la sala de su exposición.',
    };
  } else if (!programa.publicado || presentaciones.length === 0) {
    vacio = {
      titulo: 'Su presentación aún no está programada',
      texto: 'Su trabajo fue aceptado. El comité está armando las sesiones; verá los datos de su exposición cuando se publique el programa.',
    };
  }

  return (
    <section className="mi-presentacion">
      <header className="mi-presentacion-cabecera">
        <h1>Mi presentación</h1>
        <p>Datos de su exposición en el congreso</p>
      </header>

      {vacio ? (
        <div className="mi-presentacion-vacio">
          <h2>{vacio.titulo}</h2>
          <p>{vacio.texto}</p>
          <div className="mi-presentacion-vacio-acciones">
            <Link to="/mis-trabajos" className="boton-secundario">Ir a mis trabajos</Link>
            {programa.publicado && <Link to="/programa" className="boton-secundario">Ver el programa</Link>}
          </div>
        </div>
      ) : (
        <div className="mi-presentacion-columnas">
          <div className="mi-presentacion-lista">
            {presentaciones.map((p) => (
              <Tarjeta key={p.trabajo.id} {...p} />
            ))}
          </div>

          <aside className="mi-presentacion-lateral">
            <div className="mi-presentacion-indicaciones">
              <h2>Indicaciones para el expositor</h2>
              <ul>
                <li>Preséntese en la sala 15 minutos antes del inicio de la sesión.</li>
                <li>La exposición dura 15 minutos y 5 minutos de preguntas.</li>
                <li>Cargue su presentación en el equipo de la sala antes de que comience la sesión.</li>
                <li>Formato recomendado: PDF o PPTX en proporción 16:9.</li>
              </ul>
            </div>
            <div className="mi-presentacion-acciones">
              <span className="mi-presentacion-etiqueta">Acciones</span>
              {presentaciones.map((p) => (
                <button key={p.trabajo.id} type="button" className="boton-primario" onClick={() => descargarEvento(p)}>
                  <CalendarPlus size={16} aria-hidden="true" />
                  Agregar a mi calendario{presentaciones.length > 1 && ` · ${p.trabajo.codigo}`}
                </button>
              ))}
              <Link to="/programa" className="boton-secundario">Ver el programa completo</Link>
              <p>Si no puede exponer, avise al comité con al menos 48 horas de anticipación.</p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

function Tarjeta({ trabajo, sesion, posicion }) {
  return (
    <article className="mi-presentacion-tarjeta">
      <p className="mi-presentacion-codigo">
        {trabajo.codigo} <span className="insignia insignia-exito">Aceptado</span>
      </p>
      <h2>{trabajo.titulo}</h2>
      <dl className="mi-presentacion-datos">
        <div>
          <dt>Fecha</dt>
          <dd>{formatearFecha(sesion.fecha)}</dd>
          <span>{nombreDelDia(sesion.fecha)}</span>
        </div>
        <div>
          <dt>Hora</dt>
          <dd>{horaDeTrabajo(sesion, posicion)} – {horaDeTrabajo(sesion, posicion + 1)}</dd>
          <span>{DURACION_TRABAJO} minutos</span>
        </div>
        <div>
          <dt>Sala</dt>
          <dd>{sesion.sala}</dd>
          <span>{descripcionSala(sesion.sala)}</span>
        </div>
        <div>
          <dt>Orden en la sesión</dt>
          <dd>{posicion + 1} de {sesion.trabajos.length}</dd>
          <span>Sesión: {sesion.nombre}</span>
        </div>
      </dl>
      <p className="mi-presentacion-moderador">
        <span className="mi-presentacion-etiqueta">Moderación de la sesión</span>
        {sesion.moderador}
      </p>
    </article>
  );
}

// Descarga el archivo .ics para abrirlo con Google Calendar, Outlook o el calendario del celular.
function descargarEvento(presentacion) {
  const archivo = new Blob([eventoCalendario(presentacion)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `presentacion-${presentacion.trabajo.codigo}.ics`;
  enlace.click();
  URL.revokeObjectURL(url);
}
