import React, { useState } from 'react';
import './App.css';

import Login from './login.jsx';
import Register from './register.jsx';
import Portada from './Portada.jsx';
import Historia2 from './Historia2.jsx';

function App() {

  const [vista, setVista] = useState('portada');

  if (vista === 'portada') {
    return <Portada onNavegar={setVista} />;
  }

  if (vista === 'historia2') {
    return <Historia2 onNavegar={setVista} />;
  }

  if (vista === 'login') {
    return <Login onNavegar={setVista} />;
  }

  if (vista === 'register') {
    return <Register onNavegar={setVista} />;
  }

  // 4. VISTA 1.1: LANDING PAGE Y BASES DEL CONGRESO (PÁGINA PRINCIPAL)
  return (
    <div className="app-container">
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
              <a 
                href="#inicio" 
                className="active" 
                onClick={(e) => { e.preventDefault(); setVista('landing'); }}
              >
                Inicio
              </a>
            </li>
            <li><a href="#bases">Bases del congreso</a></li>
            <li><a href="#ejes">Ejes temáticos</a></li>
            <li><a href="#programa">Programa</a></li>
          </ul>
          
          <div className="auth-buttons">
            {/* BOTÓN CONECTADO AL LOGIN (1.2) */}
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setVista('login')}
            >
              Iniciar sesión
            </button>

            {/* BOTÓN CONECTADO AL REGISTRO (1.3) */}
            <button type="button" className="btn-primary" onClick={() => setVista('register')}>Crear cuenta</button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section" id="inicio">
        <div className="hero-card">
          <div className="hero-left">
            <span className="hero-tag">CONVOCATORIA ABIERTA · LIMA, 12 Y 13 DE NOVIEMBRE DE 2026</span>
            <h1 className="hero-title">VIII Congreso Académico Estudiantil</h1>
            <p className="hero-description">
              Presenta tu investigación ante el comité y la comunidad universitaria. Recibimos artículos completos, resúmenes extendidos, pósteres y casos de estudio en seis ejes temáticos.
            </p>
          </div>
          <div className="hero-right">
            {/* BOTÓN "ENVIAR MI TRABAJO" LLEVA AL LOGIN (1.2) */}
            <button 
              type="button" 
              className="btn-hero-primary" 
              onClick={() => setVista('login')}
            >
              Enviar mi trabajo
            </button>
            <a href="#bases" className="btn-hero-secondary">Descargar las bases</a>
          </div>
        </div>
      </section>

      {/* --- EJES TEMÁTICOS --- */}
      <section className="section-ejes" id="ejes">
        <div className="section-header">
          <h2 className="section-title">Ejes temáticos</h2>
          <a href="#bases" className="link-action">Ver bases completas</a>
        </div>
        <div className="grid-cards">
          <div className="card">
            <h3>Inteligencia artificial y datos</h3>
            <p>Aprendizaje automático, analítica y ciencia de datos aplicada.</p>
          </div>
          <div className="card">
            <h3>Ingeniería de software</h3>
            <p>Arquitectura, calidad, pruebas y procesos de desarrollo.</p>
          </div>
          <div className="card">
            <h3>Sostenibilidad y ciudad</h3>
            <p>Movilidad, gestión del agua y ciudades resilientes.</p>
          </div>
          <div className="card">
            <h3>Innovación y emprendimiento</h3>
            <p>Modelos de negocio, transferencia tecnológica y startups.</p>
          </div>
          <div className="card">
            <h3>Salud y sociedad</h3>
            <p>Salud pública, bienestar estudiantil y política social.</p>
          </div>
          <div className="card">
            <h3>Economía y mercados</h3>
            <p>Mercados financieros, comercio y desarrollo económico.</p>
          </div>
        </div>
      </section>

      {/* --- FECHAS LÍMITE Y CRITERIOS --- */}
      <section className="section-info grid-two-columns" id="bases">
        <div className="info-block">
          <h2 className="section-title">Fechas límite</h2>
          <ul className="info-list">
            <li>
              <span>Cierre de recepción de trabajos</span>
              <strong>30/09/2026</strong>
            </li>
            <li>
              <span>Cierre de la etapa de revisión</span>
              <strong>20/10/2026</strong>
            </li>
            <li>
              <span>Publicación de resultados</span>
              <strong>28/10/2026</strong>
            </li>
            <li>
              <span>Días del congreso</span>
              <strong>12/11/2026 – 13/11/2026</strong>
            </li>
          </ul>
        </div>

        <div className="info-block">
          <h2 className="section-title">Criterios de evaluación</h2>
          <div className="color-description">
            <ul className="info-list">
              <li>
                <span>Originalidad</span>
                <strong>25 %</strong>
              </li>
              <li>
                <span>Rigor metodológico</span>
                <strong>30 %</strong>
              </li>
              <li>
                <span>Claridad de la exposición</span>
                <strong>20 %</strong>
              </li>
              <li>
                <span>Relevancia y aporte</span>
                <strong>25 %</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

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
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn" 
                  onClick={() => setVista('register')}
                >
                  Guía para autores
                </button>
              </li>
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

export default App;