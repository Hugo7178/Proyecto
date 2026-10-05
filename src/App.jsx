import { Routes, Route } from 'react-router-dom';
import Layout from './shared/Layout';
import Inicio from './pages/Inicio';
import Portada from './pages/Portada';

// HU-1 · Cuenta y acceso
import Login from './hu1-cuenta/Login';
import Register from './hu1-cuenta/Register';
// HU-2 · Configuración de la edición
import Historia2 from './hu2-edicion/Historia2';
// HU-4 · Asignación de revisiones
import Historia4 from './hu4-asignacion/Historia4';

export default function App() {
  return (
    <Routes>
      {/* Portada del proyecto: índice de historias (diseño propio, sin header ni footer) */}
      <Route path="/portada" element={<Portada />} />

      {/* TODO: HU-2 y HU-4 todavía tienen su propio header.
          Cuando lo quiten, se mueven dentro del Layout. */}
      <Route path="/comite/edicion" element={<Historia2 />} />
      <Route path="/comite/asignaciones" element={<Historia4 />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />

        {/* HU-1 */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* HU-3: /autor/trabajos */}
        {/* HU-5: /revisor/bandeja */}
      </Route>
    </Routes>
  );
}