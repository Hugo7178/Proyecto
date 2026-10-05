import React from 'react';
import './H2cod.css';

function Historia2({ onNavegar }) {
  const sinAccion = (e) => e.preventDefault();

  return (
    <div className="historia2-pagina">
      <header className="cabecera">
        <div className="contenedor cabecera-interna">
          <div
            className="marca"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavegar && onNavegar('portada')}
          >
            <div className="logo-c">C</div>
            <div>
              <p className="marca-nombre">Congreso Académico Estudiantil</p>
              <p className="marca-sub">UNIVERSIDAD DE LIMA · EDICIÓN 2026</p>
            </div>
          </div>
          <div className="estado-edicion">
            ESTADO DE LA EDICIÓN
            <span className="etiqueta-estado">Recepción abierta</span>
          </div>
        </div>
      </header>

      <nav className="barra-nav">
        <div className="contenedor barra-nav-interna">
          <ul className="menu">
            <li><a href="#" className="activo" onClick={sinAccion}>Configuración</a></li>
            <li><a href="#" onClick={sinAccion}>Trabajos recibidos</a></li>
            <li><a href="#" onClick={sinAccion}>Revisores</a></li>
            <li><a href="#" onClick={sinAccion}>Seguimiento</a></li>
            <li><a href="#" onClick={sinAccion}>Programa</a></li>
            <li><a href="#" onClick={sinAccion}>Tablero</a></li>
            <li><a href="#" onClick={sinAccion}>Usuarios</a></li>
          </ul>
          <div className="usuario">
            <span className="usuario-icono"></span>
            <div className="usuario-datos">
              <p className="usuario-nombre">Dra. Ana Salazar Bermúdez</p>
              <p className="usuario-rol">Rol: Comité organizador</p>
            </div>
            <div className="avatar">AS</div>
          </div>
        </div>
      </nav>

      <main className="contenido">
        <div className="contenedor">
          <div className="pagina-cabecera">
            <div>
              <h1 className="pagina-titulo">Configuración de la edición</h1>
              <p className="texto-auxiliar">Defina la edición vigente antes de abrir la recepción de trabajos.</p>
            </div>
            <div className="pagina-acciones">
              <button type="button" className="btn btn-secundario">Cambiar estado de la edición</button>
              <button type="button" className="btn btn-primario">Guardar cambios</button>
            </div>
          </div>

          <div className="pestanas">
            <a href="#" className="pestana activa" onClick={sinAccion}>Edición</a>
            <a href="#" className="pestana" onClick={sinAccion}>Ejes temáticos</a>
            <a href="#" className="pestana" onClick={sinAccion}>Tipos de trabajo</a>
            <a href="#" className="pestana" onClick={sinAccion}>Fechas límite</a>
            <a href="#" className="pestana" onClick={sinAccion}>Criterios de evaluación</a>
          </div>

          <div className="grid-config">
            <section className="tarjeta">
              <div className="tarjeta-cabecera">
                <h2 className="tarjeta-titulo">Datos generales</h2>
                <span className="insignia-estado">Estado: recepción abierta</span>
              </div>

              <form className="formulario" onSubmit={sinAccion}>
                <div className="fila-campos">
                  <div className="campo campo-grande">
                    <label className="etiqueta" htmlFor="nombre">NOMBRE DE LA EDICIÓN</label>
                    <input
                      type="text"
                      id="nombre"
                      className="entrada"
                      defaultValue="VIII Congreso Académico Estudiantil"
                    />
                  </div>
                  <div className="campo">
                    <label className="etiqueta" htmlFor="anio">AÑO</label>
                    <input type="text" id="anio" className="entrada" defaultValue="2026" />
                  </div>
                </div>

                <div className="campo">
                  <label className="etiqueta" htmlFor="sede">SEDE</label>
                  <input
                    type="text"
                    id="sede"
                    className="entrada"
                    defaultValue="Auditorio Central, Universidad de Lima — Santiago de Surco"
                  />
                </div>

                <div className="campo">
                  <label className="etiqueta" htmlFor="descripcion">DESCRIPCIÓN PÚBLICA</label>
                  <textarea
                    id="descripcion"
                    className="entrada entrada-area"
                    maxLength={400}
                    defaultValue="Encuentro anual de investigación estudiantil. Se reciben artículos completos, resúmenes extendidos, pósteres y casos de estudio en seis ejes temáticos."
                  />
                  <p className="texto-auxiliar">Se muestra en la página pública del congreso. Máximo 400 caracteres.</p>
                </div>
              </form>
            </section>

            <aside className="lateral">
              <div className="tarjeta">
                <p className="etiqueta">RESUMEN DE LO CONFIGURADO</p>
                <div className="resumen-fila"><span>Ejes temáticos</span><strong className="ok">6 · listo</strong></div>
                <div className="resumen-fila"><span>Tipos de trabajo</span><strong className="ok">4 · listo</strong></div>
                <div className="resumen-fila"><span>Fechas límite</span><strong className="ok">3 · listo</strong></div>
                <div className="resumen-fila"><span>Criterios de evaluación</span><strong className="pendiente">Pendiente: pesos suman 95</strong></div>
              </div>

              <div className="aviso">
                <p className="aviso-titulo">Recepción abierta</p>
                <p>Cierra el 30/09/2026 a las 23:59. Mientras esté abierta, los autores pueden editar sus trabajos.</p>
              </div>

              <div className="tarjeta">
                <p className="etiqueta">ACTIVIDAD</p>
                <div className="resumen-fila"><span>Trabajos recibidos</span><strong>14</strong></div>
                <div className="resumen-fila"><span>Revisores registrados</span><strong>9</strong></div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="pie">
        <div className="contenedor pie-grid">
          <div>
            <p className="pie-marca">Congreso Académico Estudiantil</p>
            <p>Facultad de Ingeniería · Universidad de Lima. Av. Javier Prado Este 4600, Santiago de Surco, Lima.</p>
          </div>
          <div>
            <h4 className="pie-titulo">EL CONGRESO</h4>
            <p><a href="#" onClick={sinAccion}>Bases y requisitos</a></p>
            <p><a href="#" onClick={sinAccion}>Ejes temáticos</a></p>
            <p><a href="#" onClick={sinAccion}>Programa</a></p>
          </div>
          <div>
            <h4 className="pie-titulo">PARTICIPANTES</h4>
            <p><a href="#" onClick={sinAccion}>Guía para autores</a></p>
            <p><a href="#" onClick={sinAccion}>Guía para revisores</a></p>
            <p><a href="#" onClick={sinAccion}>Preguntas frecuentes</a></p>
          </div>
          <div>
            <h4 className="pie-titulo">CONTACTO</h4>
            <p>congreso@ulima.edu.pe</p>
            <p>(01) 437 6767 anexo 30450</p>
          </div>
        </div>
        <div className="pie-legal">
          <div className="contenedor pie-legal-interno">
            <span>© 2026 Universidad de Lima. Todos los derechos reservados.</span>
            <span>
              <a href="#" onClick={sinAccion}>Términos de uso</a> &nbsp; <a href="#" onClick={sinAccion}>Política de privacidad</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Historia2;