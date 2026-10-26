import { useState } from 'react';
import {
  obtenerSesiones,
  guardarSesiones,
  obtenerPrograma,
  guardarPrograma,
  obtenerTrabajosAceptados,
} from './programaServicio';
import { ProgramaContexto } from './programaContexto';

export default function ProgramaProvider({ children }) {
  const [sesiones, setSesiones] = useState(obtenerSesiones);
  const [programa, setPrograma] = useState(obtenerPrograma);
  // Se lee en cada render para ver al momento los dictámenes nuevos del comité.
  const trabajosAceptados = obtenerTrabajosAceptados();

  // Cada operación devuelve true si se guardó, para avisar el resultado en pantalla.
  function actualizarSesiones(nuevas) {
    setSesiones(nuevas);
    return guardarSesiones(nuevas);
  }

  // Siguiente id con el formato del contrato: S1, S2…
  function siguienteId() {
    const numeros = sesiones.map((s) => Number(s.id.slice(1)) || 0);
    return 'S' + (Math.max(0, ...numeros) + 1);
  }

  function guardarSesion(sesion) {
    if (sesion.id) {
      return actualizarSesiones(sesiones.map((s) => (s.id === sesion.id ? sesion : s)));
    }
    return actualizarSesiones([...sesiones, { ...sesion, id: siguienteId(), trabajos: [] }]);
  }

  function eliminarSesion(sesionId) {
    return actualizarSesiones(sesiones.filter((s) => s.id !== sesionId));
  }

  // Guarda la lista de trabajos de una sesión; su orden es el orden de exposición.
  function guardarTrabajosDeSesion(sesionId, trabajos) {
    return actualizarSesiones(sesiones.map((s) => (s.id === sesionId ? { ...s, trabajos } : s)));
  }

  // Al publicar se registra la fecha (AAAA-MM-DD, hora local).
  function cambiarPublicacion(publicado) {
    const hoy = new Date();
    const fecha = [hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()]
      .map((n) => String(n).padStart(2, '0'))
      .join('-');
    const nuevo = { ...programa, publicado, fechaPublicacion: publicado ? fecha : programa.fechaPublicacion };
    setPrograma(nuevo);
    return guardarPrograma(nuevo);
  }

  const valor = {
    sesiones,
    programa,
    trabajosAceptados,
    guardarSesion,
    eliminarSesion,
    guardarTrabajosDeSesion,
    cambiarPublicacion,
  };

  return <ProgramaContexto.Provider value={valor}>{children}</ProgramaContexto.Provider>;
}
