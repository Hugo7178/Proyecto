import { Routes, Route } from 'react-router-dom';
import Layout from './shared/Layout';
import Inicio from './pages/Inicio';

// HU-1 · Cuenta y acceso
import Login from './hu1-cuenta/Login';
import Register from './hu1-cuenta/Register';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />

        {/* HU-1 */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* HU-2: /comite/edicion */}
        {/* HU-3: /autor/trabajos */}
        {/* HU-4: /comite/asignaciones */}
        {/* HU-5: /revisor/bandeja */}
      </Route>
    </Routes>
  );
}