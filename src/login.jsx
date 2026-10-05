import React, { useState } from 'react';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('rosa.quispe@aloe.ulima.edu.pe');
  const [password, setPassword] = useState('•••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    // Aquí simulamos que las credenciales ingresadas son incorrectas
    // y mostramos la alerta de error (Página 7 del mockup)
    setHasError(true);
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
            <button type="button" className="btn-secondary active-auth">
              Iniciar sesión
            </button>
            <button type="button" className="btn-primary">
              Crear cuenta
            </button>
          </div>
        </nav>
      </header>

      {/* --- SECCIÓN PRINCIPAL DE INICIO DE SESIÓN --- */}
      <main className="login-main-section">
        <div className="login-card">
          <h1 className="login-title">Inicio de sesión</h1>

          {/* Subtítulo normal: solo se muestra si NO hay error */}
          {!hasError && (
            <p className="login-subtitle">
              Ingrese con su correo institucional para enviar o revisar trabajos.
            </p>
          )}

          {/* ALERTA DE ERROR GENERAL: Se muestra RECIÉN cuando hasError cambia a true */}
          {hasError && (
            <div className="alert-error-banner">
              <span className="alert-icon">!</span>
              <p>
                El correo o la contraseña no son correctos. Le quedan 3 intentos antes del bloqueo temporal.
              </p>
            </div>
          )}

          {/* Al enviar el formulario se llama a handleSubmit */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Campo: Correo Institucional */}
            <div className="form-group">
              <label htmlFor="email">CORREO INSTITUCIONAL</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (hasError) setHasError(false); // Limpia el error al escribir
                }}
                placeholder="usuario@aloe.ulima.edu.pe"
                required
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="form-group">
              <label htmlFor="password">CONTRASEÑA</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (hasError) setHasError(false); // Limpia el error al escribir
                  }}
                  className={hasError ? 'input-field-error' : ''}
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

              {/* MENSAJE EN LÍNEA DEBAJO DEL INPUT (Solo cuando hay error) */}
              {hasError && (
                <span className="field-error-message">Verifique su contraseña.</span>
              )}
            </div>

            {/* Checkbox y Opciones */}
            <div className="login-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordarme en este equipo</span>
              </label>
              <a href="#forgot" className="forgot-password-link">
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Botón Submit: Al presionar activa el handleSubmit */}
            <button type="submit" className="btn-submit-login">
              Ingresar
            </button>
          </form>

          {/* Registro link */}
          <div className="login-register-prompt">
            <span>¿No tiene cuenta? </span>
            <a href="#register" className="register-link">
              Registrarse como participante
            </a>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Congreso Académico Estudiantil</h3>
            <p>Facultad de Ingeniería · Universidad de Lima. Av. Javier Prado Este 4600, Santiago de Surco, Lima.</p>
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

export default Login;