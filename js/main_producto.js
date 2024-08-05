function renderProducto() {
    const producto = cargarProductoLS();
    let imagenProductoHTML = `<img src="../assets/imagenes-productos/${producto.imagen}"" class="img-fluid" alt=${producto.nombre} />`;
    let detalleProductoHTML = `<h1>${producto.nombre}</h1>
    <p class="text-danger fs-3">$${producto.precio} ARS</p>
    <p>${producto.descripcion}</p>
    <p class="card-text"><button class="btn btn-dark rounded-pill" onclick="agregarCarrito(${producto.id});">Agregar al carrito <i class="bi bi-plus-circle"></i></button></p>`;
    document.getElementById("imagenProducto").innerHTML = imagenProductoHTML;
    document.getElementById("detalleProducto").innerHTML = detalleProductoHTML;
}


renderProducto();
renderBotonCarrito();