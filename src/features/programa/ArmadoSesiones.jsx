import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import DialogoConfirmacion from '../../shared/DialogoConfirmacion';
import { usePrograma } from './programaContexto';
import {
  DIAS_CONGRESO,
  JORNADA,
  SALAS,
  aMinutos,
  formatearFecha,
  textoDiasCongreso,
} from './programaServicio';
import { conflictosDeSala } from './validaciones';
import FormularioSesion from './FormularioSesion';
import './ArmadoSesiones.css';

function ordenar(sesiones) {
  return [...sesiones].sort(
    (a, b) =>
      a.fecha.localeCompare(b.fecha) ||
      aMinutos(a.horaInicio) - aMinutos(b.horaInicio) ||
      a.sala.localeCompare(b.sala),
  );
}

// 6.1 · Armado de sesiones del congreso (comité).
export default function ArmadoSesiones() {
  const { sesiones, programa, trabajosAceptados, guardarSesion, eliminarSesion, cambiarPublicacion } = usePrograma();
  // null: cerrado · {}: nueva sesión · { sesion }: editar
  const [formulario, setFormulario] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const [confirmarPublicacion, setConfirmarPublicacion] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const conflictos = conflictosDeSala(sesiones);
  const enConflicto = new Set(conflictos.flat().map((s) => s.id));
  const ordenadas = ordenar(sesiones);

  const asignados = new Set(sesiones.flatMap((s) => s.trabajos));
  const aceptadosAsignados = trabajosAceptados.filter((t) => asignados.has(t.id)).length;

  function avisar(ok, texto) {
    setMensaje(
      ok
        ? { tipo: 'exito', texto }
        : { tipo: 'error', texto: 'No se pudo guardar en este navegador. Revise que no esté en modo privado e intente de nuevo.' },
    );
  }

  function alGuardar(datos) {
    const ok = guardarSesion(datos);
    avisar(ok, datos.id ? `Se guardaron los cambios de «${datos.nombre}».` : `Se creó la sesión «${datos.nombre}».`);
    setFormulario(null);
  }

  function alEliminar() {
    const ok = eliminarSesion(aEliminar.id);
    avisar(ok, `Se eliminó la sesión «${aEliminar.nombre}».`);
    setAEliminar(null);
  }

  function alCambiarPublicacion() {
    const publicar = !programa.publicado;
    const ok = cambiarPublicacion(publicar);
    avisar(
      ok,
      publicar
        ? 'Se publicó el programa. Ya se puede consultar en la página pública.'
        : 'Se retiró la publicación. El programa público muestra que aún no está disponible.',
    );
    setConfirmarPublicacion(false);
  }

  // No se publica un programa vacío ni con salas cruzadas.
  const motivoNoPublicar =
    sesiones.length === 0
      ? 'Cree al menos una sesión para publicar el programa.'
      : conflictos.length > 0
        ? 'Resuelva los solapamientos de sala para publicar.'
        : null;

  return (
    <section className="armado">
      <header className="armado-cabecera">
        <div>
          <h1>Sesiones del congreso</h1>
          <p className="armado-sub">
            {sesiones.length} {sesiones.length === 1 ? 'sesión' : 'sesiones'} · {textoDiasCongreso()} · Universidad de Lima
          </p>
          <p className="armado-estado">
            {programa.publicado ? (
              <span className="insignia insignia-exito">
                Publicado{programa.fechaPublicacion && ` el ${formatearFecha(programa.fechaPublicacion)}`}
              </span>
            ) : (
              <span className="insignia insignia-neutra">Sin publicar</span>
            )}
            {programa.publicado && <Link to="/programa">Ver programa público</Link>}
          </p>
        </div>
        <div className="armado-acciones">
          <button
            type="button"
            className="boton-secundario"
            onClick={() => setConfirmarPublicacion(true)}
            disabled={!programa.publicado && Boolean(motivoNoPublicar)}
            title={!programa.publicado ? motivoNoPublicar ?? undefined : undefined}
          >
            {programa.publicado ? 'Retirar publicación' : 'Publicar programa'}
          </button>
          <button type="button" className="boton-primario" onClick={() => setFormulario({})}>
            Nueva sesión
          </button>
        </div>
      </header>

      {!programa.publicado && motivoNoPublicar && sesiones.length > 0 && (
        <p className="armado-nota armado-nota-publicar">{motivoNoPublicar}</p>
      )}
      {programa.publicado && conflictos.length > 0 && (
        <p className="armado-nota armado-nota-publicar">
          El programa está publicado con salas cruzadas: los cambios ya se ven en la página pública.
        </p>
      )}

      {mensaje && (
        <p role="status" className={'armado-mensaje armado-mensaje-' + mensaje.tipo}>
          {mensaje.texto}
        </p>
      )}

      {conflictos.length > 0 && (
        <div className="armado-alerta" role="alert">
          <TriangleAlert size={18} aria-hidden="true" />
          <div>
            {conflictos.map(([a, b]) => (
              <p key={a.id + b.id}>
                <strong>Solapamiento de sala:</strong> «{a.nombre}» y «{b.nombre}» usan la sala {a.sala} el{' '}
                {formatearFecha(a.fecha)} entre las {a.horaInicio > b.horaInicio ? a.horaInicio : b.horaInicio} y las{' '}
                {a.horaFin < b.horaFin ? a.horaFin : b.horaFin}.
              </p>
            ))}
            <p>Ajuste la hora o la sala antes de publicar.</p>
          </div>
        </div>
      )}

      {sesiones.length === 0 ? (
        <div className="armado-vacio">
          <h2>Todavía no hay sesiones</h2>
          <p>Cree la primera sesión con su eje, fecha, horario, sala y moderador para empezar a armar el programa.</p>
          <button type="button" className="boton-primario" onClick={() => setFormulario({})}>
            Nueva sesión
          </button>
        </div>
      ) : (
        <div className="armado-tabla-scroll">
          <table className="armado-tabla">
            <thead>
              <tr>
                <th>Sesión</th>
                <th>Eje</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Sala</th>
                <th>Moderador</th>
                <th className="armado-numero">Trabajos</th>
                <th className="armado-col-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenadas.map((s) => {
                const choca = enConflicto.has(s.id);
                return (
                  <tr key={s.id} className={choca ? 'armado-fila-conflicto' : undefined}>
                    <td className="armado-nombre" data-etiqueta="Sesión">{s.nombre}</td>
                    <td data-etiqueta="Eje">{s.eje}</td>
                    <td data-etiqueta="Fecha">{formatearFecha(s.fecha)}</td>
                    <td className="armado-dato-clave" data-etiqueta="Hora">{s.horaInicio} – {s.horaFin}</td>
                    <td className="armado-dato-clave" data-etiqueta="Sala">{s.sala}</td>
                    <td data-etiqueta="Moderador">{s.moderador}</td>
                    <td className="armado-numero" data-etiqueta="Trabajos">{s.trabajos.length}</td>
                    <td className="armado-col-acciones">
                      <button type="button" className="armado-enlace" onClick={() => setFormulario({ sesion: s })}>
                        Editar
                      </button>
                      <Link to={`/comite/programa/${s.id}`} className="armado-enlace">
                        Trabajos
                      </Link>
                      <button type="button" className="armado-enlace armado-enlace-peligro" onClick={() => setAEliminar(s)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="armado-paneles">
        <OcupacionSalas sesiones={sesiones} enConflicto={enConflicto} />

        <div className="armado-panel">
          <h2 className="armado-panel-titulo">Resumen del programa</h2>
          <dl className="armado-resumen">
            <div>
              <dt>Trabajos aceptados</dt>
              <dd>{trabajosAceptados.length}</dd>
            </div>
            <div>
              <dt>Asignados a una sesión</dt>
              <dd className="armado-resumen-exito">{aceptadosAsignados}</dd>
            </div>
            <div>
              <dt>Sin sesión</dt>
              <dd className="armado-resumen-aviso">{trabajosAceptados.length - aceptadosAsignados}</dd>
            </div>
          </dl>
          <p className="armado-nota">
            Solo entran al programa los trabajos con dictamen de aceptación publicado por el comité.
          </p>
        </div>
      </div>

      {formulario && (
        <FormularioSesion
          sesion={formulario.sesion}
          otrasSesiones={sesiones.filter((s) => s.id !== formulario.sesion?.id)}
          onGuardar={alGuardar}
          onCerrar={() => setFormulario(null)}
        />
      )}

      <DialogoConfirmacion
        abierto={Boolean(aEliminar)}
        titulo="¿Eliminar esta sesión?"
        mensaje={
          aEliminar &&
          `Se eliminará «${aEliminar.nombre}»` +
            (aEliminar.trabajos.length > 0
              ? ` y sus ${aEliminar.trabajos.length} trabajos volverán a la lista de trabajos sin sesión.`
              : '.') +
            ' Esta acción no se puede deshacer.'
        }
        textoConfirmar="Eliminar sesión"
        onConfirmar={alEliminar}
        onCancelar={() => setAEliminar(null)}
      />

      <DialogoConfirmacion
        abierto={confirmarPublicacion}
        titulo={programa.publicado ? '¿Retirar la publicación del programa?' : '¿Publicar el programa?'}
        mensaje={
          programa.publicado
            ? 'El programa dejará de verse en la página pública y los autores no verán su presentación hasta que vuelva a publicarlo.'
            : `Se publicarán ${sesiones.length} sesiones. Cualquier persona podrá consultarlas y cada autor verá la fecha, hora y sala de su presentación.`
        }
        textoConfirmar={programa.publicado ? 'Retirar publicación' : 'Publicar'}
        onConfirmar={alCambiarPublicacion}
        onCancelar={() => setConfirmarPublicacion(false)}
      />
    </section>
  );
}

// Barras con las horas ocupadas de cada sala en el día elegido.
function OcupacionSalas({ sesiones, enConflicto }) {
  const [dia, setDia] = useState(DIAS_CONGRESO[0]);
  const inicio = aMinutos(JORNADA.inicio);
  const total = aMinutos(JORNADA.fin) - inicio;
  const porcentaje = (hora) => ((Math.min(Math.max(aMinutos(hora), inicio), inicio + total) - inicio) / total) * 100;

  return (
    <div className="armado-panel">
      <div className="armado-panel-cabecera">
        <h2 className="armado-panel-titulo">Ocupación de salas · {formatearFecha(dia)}</h2>
        <div className="armado-dias" role="group" aria-label="Día">
          {DIAS_CONGRESO.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={d === dia}
              className={'armado-dia' + (d === dia ? ' activo' : '')}
              onClick={() => setDia(d)}
            >
              {formatearFecha(d).slice(0, 5)}
            </button>
          ))}
        </div>
      </div>
      <ul className="armado-ocupacion">
        {SALAS.map((sala) => {
          const delDia = sesiones
            .filter((s) => s.fecha === dia && s.sala === sala)
            .sort((a, b) => aMinutos(a.horaInicio) - aMinutos(b.horaInicio));
          return (
            <li key={sala}>
              <span className="armado-ocupacion-sala">{sala}</span>
              <span className="armado-ocupacion-pista">
                {delDia.map((s) => (
                  <span
                    key={s.id}
                    className={'armado-ocupacion-bloque' + (enConflicto.has(s.id) ? ' conflicto' : '')}
                    style={{
                      '--armado-desde': `${porcentaje(s.horaInicio)}%`,
                      '--armado-ancho': `${porcentaje(s.horaFin) - porcentaje(s.horaInicio)}%`,
                    }}
                    title={`${s.nombre} · ${s.horaInicio}–${s.horaFin}`}
                  />
                ))}
              </span>
              <span className="armado-ocupacion-horas">
                {delDia.length === 0 ? 'Libre' : delDia.map((s) => `${s.horaInicio}–${s.horaFin}`).join(', ')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
