// ==== main.js ====

// Seleccionamos todos los botones para agregar
const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

// Cargar carrito desde localStorage o crear vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar la cantidad actual en el contador
contadorCarrito.textContent = carrito.length;

// Función para guardar carrito y actualizar contador
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  contadorCarrito.textContent = carrito.length;
}

// Evento para cada botón "Agregar al carrito"
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();

    const card = e.target.closest(".card");
    const nombre = card.querySelector(".card-title").textContent;
    const precio = parseInt(boton.dataset.precio);
    const imagen = card.querySelector("img").getAttribute("src");

    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: `¿Agregar "${nombre}" al carrito?`,
      text: `Precio: $${precio.toLocaleString()}`,
      imageUrl: imagen,
      imageWidth: 150,
      imageHeight: 150,
      showCancelButton: true,
      confirmButtonColor: '#4bf508ff',
      cancelButtonColor: 'rgba(15, 15, 15, 1)',
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // Crear el producto
        const producto = { nombre, precio, imagen };

        // Agregar al carrito
        carrito.push(producto);
        actualizarCarrito();

        // Confirmación de agregado
        Swal.fire({
          icon: 'warning',
          title: `${nombre} agregado al carrito 🛒`,
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  });
});

