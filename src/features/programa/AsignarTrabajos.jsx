import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePrograma } from './programaContexto';
import {
  DURACION_TRABAJO,
  aHora,
  aMinutos,
  capacidadDeSesion,
  formatearFecha,
  horaDeTrabajo,
} from './programaServicio';
import './AsignarTrabajos.css';

export default function AsignarTrabajos() {
  const { sesionId } = useParams();
  const { sesiones } = usePrograma();
  const sesion = sesiones.find((s) => s.id === sesionId);

  if (!sesion) {
    return (
      <section className="asignar">
        <div className="asignar-vacio">
          <h1>No se encontró la sesión</h1>
          <p>Es posible que se haya eliminado. Vuelva a la lista para elegir otra.</p>
          <Link to="/comite/programa" className="boton-secundario">Volver a las sesiones</Link>
        </div>
      </section>
    );
  }

  // key: al cambiar de sesión se reinicia la lista en edición.
  return <Asignacion key={sesion.id} sesion={sesion} />;
}

function Asignacion({ sesion }) {
  const { sesiones, trabajosAceptados, guardarTrabajosDeSesion } = usePrograma();
  const aceptadoPorId = new Map(trabajosAceptados.map((t) => [t.id, t]));
  // Lista en edición: solo se guarda al pulsar «Guardar sesión».
  const [lista, setLista] = useState(() => sesion.trabajos.filter((id) => aceptadoPorId.has(id)));
  const [mensaje, setMensaje] = useState(null);

  const capacidad = capacidadDeSesion(sesion);
  const llena = lista.length >= capacidad;
  const enOtrasSesiones = new Set(sesiones.filter((s) => s.id !== sesion.id).flatMap((s) => s.trabajos));
  // Primero los del mismo eje de la sesión.
  const disponibles = trabajosAceptados
    .filter((t) => !lista.includes(t.id) && !enOtrasSesiones.has(t.id))
    .sort((a, b) => (b.eje === sesion.eje) - (a.eje === sesion.eje) || a.codigo.localeCompare(b.codigo));
  const sinGuardar = lista.join() !== sesion.trabajos.join();

  function agregar(id) {
    if (llena) return;
    setLista([...lista, id]);
    setMensaje(null);
  }

  function quitar(id) {
    setLista(lista.filter((x) => x !== id));
    setMensaje(null);
  }

  // direccion -1 sube el trabajo y +1 lo baja.
  function mover(posicion, direccion) {
    const destino = posicion + direccion;
    if (destino < 0 || destino >= lista.length) return;
    const nueva = [...lista];
    [nueva[posicion], nueva[destino]] = [nueva[destino], nueva[posicion]];
    setLista(nueva);
    setMensaje(null);
  }

  function guardar() {
    const ok = guardarTrabajosDeSesion(sesion.id, lista);
    setMensaje(
      ok
        ? { tipo: 'exito', texto: `Se guardó la sesión con ${lista.length} ${lista.length === 1 ? 'trabajo' : 'trabajos'}.` }
        : { tipo: 'error', texto: 'No se pudo guardar en este navegador. Intente de nuevo.' },
    );
  }

  const inicioLibre = aMinutos(sesion.horaInicio) + lista.length * DURACION_TRABAJO;

  return (
    <section className="asignar">
      <p className="asignar-migas">
        <Link to="/comite/programa">Sesiones del congreso</Link> › {sesion.nombre}
      </p>

      <header className="asignar-cabecera">
        <div>
          <h1>Asignar trabajos a la sesión</h1>
          <p className="asignar-sub">
            Sesión seleccionada: {sesion.nombre} · {formatearFecha(sesion.fecha)} · {sesion.horaInicio}–{sesion.horaFin} ·
            Sala {sesion.sala}
          </p>
        </div>
        <div className="asignar-acciones">
          {sinGuardar && <span className="insignia insignia-aviso">Cambios sin guardar</span>}
          <button type="button" className="boton-primario" onClick={guardar} disabled={!sinGuardar}>
            Guardar sesión
          </button>
        </div>
      </header>

      {mensaje && (
        <p role="status" className={'asignar-mensaje asignar-mensaje-' + mensaje.tipo}>
          {mensaje.texto}
        </p>
      )}

      <div className="asignar-columnas">
        <div className="asignar-panel">
          <div className="asignar-panel-cabecera">
            <h2>Trabajos aceptados sin sesión</h2>
            <span>{disponibles.length} {disponibles.length === 1 ? 'trabajo' : 'trabajos'}</span>
          </div>
          {disponibles.length === 0 ? (
            <p className="asignar-panel-vacio">
              No quedan trabajos aceptados sin sesión. Cuando el comité acepte nuevos trabajos aparecerán aquí.
            </p>
          ) : (
            <ul className="asignar-lista">
              {disponibles.map((t) => (
                <li key={t.id} className="asignar-disponible">
                  <div>
                    <span className="asignar-codigo">{t.codigo}</span>
                    <strong className="asignar-titulo">{t.titulo}</strong>
                    <span className="asignar-detalle">
                      {t.eje} · {t.tipo}
                      {t.eje !== sesion.eje && <span className="asignar-otro-eje"> · otro eje</span>}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="boton-secundario asignar-agregar"
                    onClick={() => agregar(t.id)}
                    disabled={llena}
                    aria-label={`Agregar ${t.codigo} a la sesión`}
                  >
                    Agregar →
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="asignar-panel asignar-panel-sesion">
          <div className="asignar-panel-cabecera">
            <h2>Contenido de la sesión</h2>
            <span>
              {lista.length} de {capacidad} espacios · {DURACION_TRABAJO} min por trabajo
            </span>
          </div>
          {lista.length === 0 && (
            <p className="asignar-panel-vacio">La sesión aún no tiene trabajos. Agréguelos desde la lista de la izquierda.</p>
          )}
          <ol className="asignar-lista">
            {lista.map((id, i) => {
              const t = aceptadoPorId.get(id);
              return (
                <li key={id} className="asignar-asignado">
                  <span className="asignar-orden" aria-hidden="true">{i + 1}</span>
                  <div>
                    <strong className="asignar-titulo">{t.titulo}</strong>
                    <span className="asignar-detalle">
                      {t.codigo} · {horaDeTrabajo(sesion, i)} – {horaDeTrabajo(sesion, i + 1)}
                    </span>
                  </div>
                  <div className="asignar-controles">
                    <button
                      type="button"
                      className="asignar-mover"
                      onClick={() => mover(i, -1)}
                      disabled={i === 0}
                      aria-label={`Subir ${t.codigo}`}
                    >
                      <ChevronUp size={14} aria-hidden="true" /> Subir
                    </button>
                    <button
                      type="button"
                      className="asignar-mover"
                      onClick={() => mover(i, 1)}
                      disabled={i === lista.length - 1}
                      aria-label={`Bajar ${t.codigo}`}
                    >
                      <ChevronDown size={14} aria-hidden="true" /> Bajar
                    </button>
                    <button
                      type="button"
                      className="asignar-quitar"
                      onClick={() => quitar(id)}
                      aria-label={`Quitar ${t.codigo} de la sesión`}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
          {!llena ? (
            <div className="asignar-espacio">
              Espacio disponible · {aHora(inicioLibre)} – {aHora(inicioLibre + DURACION_TRABAJO)}
              <span>Agregue un trabajo desde la lista de la izquierda</span>
            </div>
          ) : (
            <div className="asignar-espacio asignar-espacio-lleno">
              La sesión está completa. Para agregar más trabajos, amplíe su horario en «Editar».
            </div>
          )}
        </div>
      </div>

      <div className="asignar-notas">
        <p className="asignar-nota-destacada">
          El orden de la lista define el orden de exposición y la hora de cada trabajo dentro de la sesión.
        </p>
        <p className="asignar-nota">
          Solo los trabajos con decisión «aceptado» aparecen en la columna izquierda. Un trabajo solo puede estar en una
          sesión.
        </p>
      </div>
    </section>
  );
}
