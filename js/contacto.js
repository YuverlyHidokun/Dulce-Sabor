document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  const mensaje = document.getElementById('mensaje-enviado');
  const botonCerrar = document.getElementById('cerrar-mensaje');

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    formulario.reset();
    mensaje.style.display = 'flex';
  });

  botonCerrar.addEventListener('click', () => {
    mensaje.style.display = 'none';
  });
});
