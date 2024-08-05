async function renderProducto() {
    await obtenerProductosJSON(); // Espera a que los productos se carguen
    const producto = cargarProductoLS();

    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }

    const contenidoImagenProductoHTML = document.querySelector('#imagenProducto');
    const contenidoDetalleProductoHTML = document.querySelector('#detalleProducto');

    let imagenProductoHTML = "";
    let detalleProductoHTML = "";

    imagenProductoHTML += `<img src="../assets/imagenes-productos/${producto.imagen}" class="img-fluid" alt="${producto.nombre}" />`;
    detalleProductoHTML += `<h1>${producto.nombre}</h1>
    <p class="text-danger fs-3">$${producto.precio} ARS</p>
    <p>${producto.descripcion}</p>
    <p>Categoría/s: ${producto.categoria}</p>
    <p class="card-text"><button class="btn btn-dark rounded-pill" onclick="agregarCarrito(${producto.id});">Agregar al carrito <i class="bi bi-plus-circle"></i></button></p>`;

    contenidoImagenProductoHTML.innerHTML = imagenProductoHTML;
    contenidoDetalleProductoHTML.innerHTML = detalleProductoHTML;
}

renderProducto();
renderBotonCarrito();
