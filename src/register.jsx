import React, { useState } from 'react';
import './register.css';

function Register({ onNavegar }) {
  const [formData, setFormData] = useState({
    nombres: 'Rosa María',
    apellidos: 'Quispe Ttito',
    email: 'rosa.quispe@aloe.ulima.edu.pe',
    institucion: 'Universidad de Lima',
    password: '•••••••••',
    confirmPassword: '•••••••••',
    carrera: 'Ingeniería de Sistemas',
    codigoAlumno: '20211547',
    rolParticipacion: 'autor', // 'autor', 'revisor' o 'ambos'
    aceptaBases: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Al enviar con éxito, navega a la pantalla de confirmación/bienvenida (1.3 éxito)
    if (onNavegar) onNavegar('registerSuccess');
  };

  return (
    <div className="login-app-container">
      {/* Franja superior granate del header */}
      <div className="top-header-bar"></div>

      {/* --- HEADER --- */}
      <header className="main-header">
        <div className="header-top">
          <div className="brand-logo">
            <div className="logo-box">C</div>
            <div className="brand-titles">
              <h2>Congreso Académico Estudiantil</h2>
              <p>UNIVERSIDAD DE LIMA · EDICIÓN 2026</p>
            </div>
          </div>
          <div className="edition-status">
            <span className="status-label">ESTADO DE LA EDICIÓN</span>
            <span className="status-badge">Recepción abierta</span>
          </div>
        </div>

        <nav className="main-nav">
          <ul className="nav-links">
            <li>
              <a href="#inicio" onClick={() => onNavegar && onNavegar('landing')}>
                Inicio
              </a>
            </li>
            <li><a href="#bases">Bases del congreso</a></li>
            <li><a href="#ejes">Ejes temáticos</a></li>
            <li><a href="#programa">Programa</a></li>
          </ul>
          <div className="auth-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavegar && onNavegar('login')}
            >
              Iniciar sesión
            </button>
            <button type="button" className="btn-primary active-auth">
              Crear cuenta
            </button>
          </div>
        </nav>
      </header>

      {/* --- CONTENIDO PRINCIPAL: REGISTRO DE PARTICIPANTE --- */}
      <main className="register-main-section">
        <div className="register-layout-grid">
          
          {/* Columna Izquierda: Formulario de Registro */}
          <div className="register-card">
            <h1 className="register-title">Registro de participante</h1>
            <p className="register-subtitle">
              Los campos marcados con asterisco (*) son obligatorios.
            </p>

            <form className="register-form" onSubmit={handleSubmit}>
              
              {/* Nombres y Apellidos */}
              <div className="form-row-two-cols">
                <div className="form-group">
                  <label htmlFor="nombres">NOMBRES *</label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellidos">APELLIDOS *</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Correo Institucional */}
              <div className="form-group">
                <label htmlFor="email">CORREO INSTITUCIONAL *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="field-help-text">Se usará para todas las notificaciones.</span>
              </div>

              {/* Institución */}
              <div className="form-group">
                <label htmlFor="institucion">INSTITUCIÓN *</label>
                <select
                  id="institucion"
                  name="institucion"
                  value={formData.institucion}
                  onChange={handleChange}
                  required
                >
                  <option value="Universidad de Lima">Universidad de Lima</option>
                  <option value="Otra Institución">Otra Institución</option>
                </select>
              </div>

              {/* Contraseñas en dos columnas */}
              <div className="form-row-two-cols">
                <div className="form-group">
                  <label htmlFor="password">CONTRASEÑA *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  <span className="field-help-text">
                    Mínimo 8 caracteres, con una mayúscula y un número.
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Carrera y Código de Alumno */}
              <div className="form-row-two-cols">
                <div className="form-group">
                  <label htmlFor="carrera">CARRERA *</label>
                  <select
                    id="carrera"
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    required
                  >
                    <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                    <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                    <option value="Administración">Administración</option>
                    <option value="Economía">Economía</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="codigoAlumno">CÓDIGO DE ALUMNO</label>
                  <input
                    type="text"
                    id="codigoAlumno"
                    name="codigoAlumno"
                    value={formData.codigoAlumno}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Deseo participar como (Radio buttons) */}
              <div className="form-group">
                <label className="section-radio-title">DESEO PARTICIPAR COMO *</label>
                <div className="radio-options-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="rolParticipacion"
                      value="autor"
                      checked={formData.rolParticipacion === 'autor'}
                      onChange={handleChange}
                    />
                    <div>
                      <strong>Autor</strong>
                      <span>Enviaré uno o más trabajos.</span>
                    </div>
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="rolParticipacion"
                      value="revisor"
                      checked={formData.rolParticipacion === 'revisor'}
                      onChange={handleChange}
                    />
                    <div>
                      <strong>Revisor</strong>
                      <span>Evaluaré trabajos asignados.</span>
                    </div>
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="rolParticipacion"
                      value="ambos"
                      checked={formData.rolParticipacion === 'ambos'}
                      onChange={handleChange}
                    />
                    <div>
                      <strong>Ambos</strong>
                      <span>Autor y revisor.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Checkbox Acepto bases */}
              <div className="form-group checkbox-bases">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="aceptaBases"
                    checked={formData.aceptaBases}
                    onChange={handleChange}
                    required
                  />
                  <span>Acepto las bases del congreso y el tratamiento de mis datos.</span>
                </label>
              </div>

              {/* Acciones del formulario */}
              <div className="register-actions">
                <button
                  type="button"
                  className="btn-cancel-register"
                  onClick={() => onNavegar && onNavegar('landing')}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-submit-register">
                  Crear mi cuenta
                </button>
              </div>

            </form>
          </div>

          {/* Columna Derecha: Panel informativo lateral */}
          <aside className="register-info-sidebar">
            <div className="info-sidebar-box">
              <h3>Antes de registrarse</h3>
              <p>
                La recepción de trabajos cierra el <strong>30/09/2026 a las 23:59</strong>. Después de esa fecha no será posible editar los envíos.
              </p>
              <p>
                Si participa como revisor, deberá declarar sus líneas de interés para recibir asignaciones sin conflicto.
              </p>
            </div>
          </aside>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-col brand-col">
            <h3>Congreso Académico Estudiantil</h3>
            <p>
              Facultad de Ingeniería · Universidad de Lima. Av. Javier Prado Este 4600, Santiago de Surco, Lima.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="gold-title">EL CONGRESO</h4>
            <ul>
              <li><a href="#bases">Bases y requisitos</a></li>
              <li><a href="#ejes">Ejes temáticos</a></li>
              <li><a href="#programa">Programa</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="gold-title">PARTICIPANTES</h4>
            <ul>
              <li><a href="#autores">Guía para autores</a></li>
              <li><a href="#revisores">Guía para revisores</a></li>
              <li><a href="#faq">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="gold-title">CONTACTO</h4>
            <p>congreso@ulima.edu.pe</p>
            <p>(01) 437 6767 anexo 30450</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Universidad de Lima. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <a href="#terminos">Términos de uso</a>
            <a href="#privacidad">Política de privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;