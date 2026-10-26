import { Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import Inicio from "./features/publico/Inicio";
import Portada from "./features/publico/Portada";

import InicioSesion from "./features/cuenta/InicioSesion";
import Registro from "./features/cuenta/Registro";
import Bienvenida from "./features/cuenta/Bienvenida";
import MiCuenta from "./features/cuenta/MiCuenta";
import RecuperarContrasena from "./features/cuenta/RecuperarContrasena";
import PaginaNoEncontrada from "./features/publico/PaginaNoEncontrada";
import RutaProtegida from "./features/cuenta/RutaProtegida";
import NuevoTrabajo from "./features/trabajos/NuevoTrabajo";
import Coautores from "./features/trabajos/Coautores";
import MisTrabajos from "./features/trabajos/MisTrabajos";
import DetalleTrabajo from "./features/trabajos/DetalleTrabajo";
import ConfiguracionEdicion from "./features/edicion/ConfiguracionEdicion";
import EjesTematicos from "./features/edicion/EjesTematicos";
import TiposTrabajo from "./features/edicion/TiposTrabajo";
import FechasLimite from "./features/edicion/FechasLimite";
import CriteriosEvaluacion from "./features/edicion/CriteriosEvaluacion";
import AsignacionRevisores from "./features/asignaciones/AsignacionRevisores";
import BandejaRevisor from "./features/revisiones/BandejaRevisor";
import FormularioEvaluacion from "./features/revisiones/FormularioEvaluacion";
import RevisionesProvider from "./features/revisiones/RevisionesProvider";
import ConsolidadoTrabajo from "./features/revisiones/ConsolidadoTrabajo";
import RutaRevisor from "./features/cuenta/RutaRevisor";
import ProgramaProvider from "./features/programa/ProgramaProvider";
import ProgramaPublico from "./features/programa/ProgramaPublico";
import ArmadoSesiones from "./features/programa/ArmadoSesiones";
import AsignarTrabajos from "./features/programa/AsignarTrabajos";
import MiPresentacion from "./features/programa/MiPresentacion";

export default function App() {
  return (
    <RevisionesProvider>
    <ProgramaProvider>
      <Routes>
        {/* Portada del proyecto: índice de historias (diseño propio, sin header ni footer) */}
        <Route path="/portada" element={<Portada />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />

          <Route path="/login" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route element={<RutaProtegida rolesPermitidos={['autor', 'revisor', 'ambos', 'comite']} />}>
            <Route path="/mi-cuenta" element={<MiCuenta />} />
          </Route>
          <Route
            path="/recuperar-contrasena"
            element={<RecuperarContrasena />}
          />
          <Route path="*" element={<PaginaNoEncontrada />} />

          <Route path="/nuevo-trabajo" element={<NuevoTrabajo />} />
          <Route path="/nuevo-trabajo/coautores" element={<Coautores />} />
          <Route path="/mis-trabajos" element={<MisTrabajos />} />
          <Route path="/mis-trabajos/:trabajoId" element={<DetalleTrabajo />} />

          <Route element={<RutaRevisor />}>
            <Route path="/revisor/bandeja" element={<BandejaRevisor />} />
            <Route
              path="/revisor/revision/:asignacionId"
              element={<FormularioEvaluacion />}
            />
          </Route>

          <Route element={<RutaProtegida rolesPermitidos={['comite']} />}>
            <Route path="/comite/edicion" element={<ConfiguracionEdicion />} />
            <Route path="/comite/edicion/ejes" element={<EjesTematicos />} />
            <Route path="/comite/edicion/tipos" element={<TiposTrabajo />} />
            <Route path="/comite/edicion/fechas" element={<FechasLimite />} />
            <Route path="/comite/edicion/criterios" element={<CriteriosEvaluacion />} />
          </Route>

          <Route element={<RutaProtegida rolesPermitidos={['comite']} />}>
            <Route path="/comite/asignaciones" element={<AsignacionRevisores />} />
            <Route
              path="/comite/trabajos/:trabajoId/consolidado"
              element={<ConsolidadoTrabajo />}
            />
          </Route>

          <Route path="/programa" element={<ProgramaPublico />} />
          <Route element={<RutaProtegida rolesPermitidos={['comite']} />}>
            <Route path="/comite/programa" element={<ArmadoSesiones />} />
            <Route path="/comite/programa/:sesionId" element={<AsignarTrabajos />} />
          </Route>
          <Route element={<RutaProtegida rolesPermitidos={['autor', 'ambos']} />}>
            <Route path="/mi-presentacion" element={<MiPresentacion />} />
          </Route>
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </ProgramaProvider>
    </RevisionesProvider>
  );
}
