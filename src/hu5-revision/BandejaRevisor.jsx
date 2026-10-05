import './BandejaRevisor.css';

const ASIGNACIONES = [
  { id: 'A1', codigo: 'TRB-2026-042', titulo: 'Predicción de deserción universitaria mediante aprendizaje supervisado', eje: 'Inteligencia artificial y datos', fechaLimite: '2026-10-20', estado: 'Pendiente' },
  { id: 'A2', codigo: 'TRB-2026-035', titulo: 'Pruebas automatizadas en proyectos universitarios de software', eje: 'Ingeniería de software', fechaLimite: '2026-10-18', estado: 'En progreso' },
  { id: 'A3', codigo: 'TRB-2026-051', titulo: 'Uso de agua reciclada en el riego de áreas verdes del campus', eje: 'Sostenibilidad y ciudad', fechaLimite: '2026-10-10', estado: 'Enviada' },
];

function claseEstado(estado) {
  return 'estado-' + estado.toLowerCase().replace(' ', '-');
}

export default function BandejaRevisor() {
  return (
    <section className="bandeja">
      <h1>Mis revisiones asignadas</h1>
      <p className="bandeja-sub">Trabajos que el comité le asignó para evaluar.</p>

      {ASIGNACIONES.length === 0 ? (
        <p className="bandeja-vacia">Aún no tiene trabajos asignados.</p>
      ) : (
        <table className="bandeja-tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Trabajo</th>
              <th>Fecha límite</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ASIGNACIONES.map((a) => (
              <tr key={a.id}>
                <td>{a.codigo}</td>
                <td>
                  <strong>{a.titulo}</strong>
                  <span className="bandeja-eje">{a.eje}</span>
                </td>
                <td>{a.fechaLimite}</td>
                <td>
                  <span className={'etiqueta ' + claseEstado(a.estado)}>{a.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}