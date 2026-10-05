import { Link, NavLink } from 'react-router-dom';

// Encabezado común. Se modifica SOLO aquí.
export default function Header() {
  return (
    <>
      <div className="top-header-bar"></div>

      <header className="main-header">
        <div className="header-top">
          <Link to="/" className="brand-logo">
            <div className="logo-box">C</div>
            <div className="brand-titles">
              <h2>Congreso Académico Estudiantil</h2>
              <p>UNIVERSIDAD DE LIMA · EDICIÓN 2026</p>
            </div>
          </Link>

          <div className="edition-status">
            <span className="status-label">ESTADO DE LA EDICIÓN</span>
            <span className="status-badge">Recepción abierta</span>
          </div>
        </div>

        <nav className="main-nav">
          <ul className="nav-links">
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><a href="/#bases">Bases del congreso</a></li>
            <li><a href="/#ejes">Ejes temáticos</a></li>
            <li><a href="/#programa">Programa</a></li>
          </ul>

          <div className="auth-buttons">
            <NavLink to="/login" className="btn-secondary">Iniciar sesión</NavLink>
            <NavLink to="/registro" className="btn-primary">Crear cuenta</NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}