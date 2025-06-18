const carrito = [];
const ivaPorcentaje = 0.15;

document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const subtotalEl = document.getElementById('subtotal');
  const ivaEl = document.getElementById('iva');
  const totalEl = document.getElementById('total');
  const btnpedido = document.getElementById('realizar-pedido');

  // Escuchar los botones de productos
  document.querySelectorAll('.producto button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const producto = btn.closest('.producto');
      const nombre = producto.querySelector('h3').textContent;
      const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));

      const existente = carrito.find(item => item.nombre === nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ nombre, precio, cantidad: 1 });
      }

      actualizarCarrito();
    });
  });

  // Botón de "Realizar Pedido"
  btnpedido.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    alert('Gracias por su pedido 🧡');
    carrito.length = 0;
    actualizarCarrito();
  });

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let subtotal = 0;

    carrito.forEach((item, index) => {
      subtotal += item.precio * item.cantidad;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
        <button class="eliminar" data-index="${index}" style="margin-left: 10px; cursor: pointer;">🗑️</button>
      `;
      listaCarrito.appendChild(li);
    });

    // Asignar eventos a los botones de eliminar
    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });

    const iva = subtotal * ivaPorcentaje;
    const total = subtotal + iva;

    subtotalEl.textContent = subtotal.toFixed(2);
    ivaEl.textContent = iva.toFixed(2);
    totalEl.textContent = total.toFixed(2);
  }
});
