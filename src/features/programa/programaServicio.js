import seed from '../../data/seed.json';

const CLAVE_SESIONES = 'congreso.sesiones';
const CLAVE_PROGRAMA = 'congreso.programa';
// Clave compartida con la HU-5: ahí se guardan las decisiones del comité.
const CLAVE_DICTAMENES = 'congreso.dictamenes';

export const DURACION_TRABAJO = 20;

export const SALAS = ['A-101', 'B-201', 'C-305'];

export const DIAS_CONGRESO = ['2026-11-12', '2026-11-13'];

// Rango del día que se muestra en la ocupación de salas.
export const JORNADA = { inicio: '08:00', fin: '19:00' };

// Lee de localStorage; si no hay datos guardados devuelve los del seed.
function leer(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch {
    return valorInicial;
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function obtenerSesiones() {
  return leer(CLAVE_SESIONES, seed.sesiones);
}

// Devuelven false si el navegador no permitió guardar.
export function guardarSesiones(sesiones) {
  return escribir(CLAVE_SESIONES, sesiones);
}

export function obtenerPrograma() {
  return leer(CLAVE_PROGRAMA, seed.programa);
}

export function guardarPrograma(programa) {
  return escribir(CLAVE_PROGRAMA, programa);
}

// Ejes temáticos con los mismos nombres que usan los trabajos.
export function obtenerEjes() {
  return [...new Set(seed.trabajos.map((t) => t.eje))].sort();
}

// Los moderadores se eligen entre los revisores de la edición.
export function obtenerModeradores() {
  return seed.revisores.map((r) => r.nombre);
}

// Trabajos con dictamen de aceptación publicado (HU-5): los únicos que entran al programa.
// Incluye las decisiones que el comité registra en el navegador, no solo las del seed.
export function obtenerTrabajosAceptados() {
  const aceptados = leer(CLAVE_DICTAMENES, seed.dictamenes)
    .filter((d) => d.estado !== 'borrador')
    .filter((d) => d.decision === 'aceptado' || d.decision === 'aceptado_con_observaciones')
    .map((d) => d.trabajoId);
  return seed.trabajos.filter((t) => aceptados.includes(t.id));
}

export function aMinutos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

export function aHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

// Hora de inicio del trabajo según su posición en la sesión.
export function horaDeTrabajo(sesion, posicion) {
  return aHora(aMinutos(sesion.horaInicio) + posicion * DURACION_TRABAJO);
}

export function capacidadDeSesion(sesion) {
  return Math.floor((aMinutos(sesion.horaFin) - aMinutos(sesion.horaInicio)) / DURACION_TRABAJO);
}

export function formatearFecha(fecha) {
  const [a, m, d] = fecha.split('-');
  return `${d}/${m}/${a}`;
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'];

// "12 y 13 de noviembre de 2026" (los días del congreso están en el mismo mes).
export function textoDiasCongreso() {
  const partes = DIAS_CONGRESO.map((f) => f.split('-').map(Number));
  const [anio, mes] = partes[0];
  const dias = partes.map(([, , d]) => d);
  const lista = dias.length > 1 ? `${dias.slice(0, -1).join(', ')} y ${dias.at(-1)}` : `${dias[0]}`;
  return `${lista} de ${MESES[mes - 1]} de ${anio}`;
}

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function nombreDelDia(fecha) {
  const [a, m, d] = fecha.split('-').map(Number);
  return DIAS[new Date(a, m - 1, d).getDay()];
}

// Abrevia los autores, por ejemplo: "R. Quispe y 2 más".
export function autoresAbreviados(trabajo) {
  const [nombre, apellido] = trabajo.autor.nombre.split(' ');
  const principal = `${nombre[0]}. ${apellido}`;
  const otros = trabajo.coautores.length;
  return otros === 0 ? principal : `${principal} y ${otros} más`;
}
