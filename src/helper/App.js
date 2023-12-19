export const getIdRound = () => {
  const id = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);
  return `${id}-${fecha}`;
}

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return fechaNueva.toLocaleDateString('es-ES', opciones);
}