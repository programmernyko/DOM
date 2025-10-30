// ==== carrito.js (Carrito) ====

const contenedor = document.getElementById("carrito-contenedor");
const totalEl = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos del carrito
function mostrarCarrito() {
  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = `<h2>TU CARRITO ESTA VACIO </h2>`;
    return;
  }

  carrito.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
      <div class="card-body">
        <h5>${p.nombre}</h5>
        <p>Precio: $${p.precio.toLocaleString()}</p>
        <button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);

    // 🔹 Sumar precios
    total += p.precio;
  });

  // 🔹 Mostrar total general
  totalEl.textContent = "Total: $" + total.toLocaleString();

  // Botones para eliminar productos
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;

      Swal.fire({
        title: `¿Eliminar "${carrito[i].nombre}" del carrito?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.isConfirmed) {
          carrito.splice(i, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          mostrarCarrito();

          Swal.fire({
            icon: "success",
            title: "Producto eliminado 🗑️",
            showConfirmButton: false,
            timer: 1000
          });
        }
      });
    });
  });
}

// Vaciar carrito completo
botonVaciar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar todo el carrito?",
    text: "Se eliminarán todos los productos",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");
      carrito = [];
      mostrarCarrito();

      Swal.fire({
        icon: "success",
        title: "Carrito vaciado 🧹",
        showConfirmButton: false,
        timer: 1200
      });
    }
  });
});

// Mostrar carrito al cargar
mostrarCarrito();
