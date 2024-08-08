function cargarProductosJSON(){
    const contenidoHTML = document.querySelector('#contenido');

    fetch('./json/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data; // Guarda los productos obtenidos en la variable "Productos" pisando su contenido
        let productosHTML = ""; // Declaro la variable del contenido HTML de mis productos
        
        for (const producto of productos) {
            productosHTML += `<div class="col-md-3 animate__animated card-container">
            <div class="card border-0">
            <a href="./pages/producto.html" onclick="idProductoDetallado(${producto.id});">
                <img src="./assets/imagenes-productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            </a>
            <div class="card-body">
                <h5 class="card-text text-center">${producto.nombre}</h5>
                <p class="card-text text-center text-danger">$${producto.precio} ARS</p>
                <p class="text-center"><button class="btn btn-dark rounded-pill" onclick="agregarCarrito(${producto.id});">Agregar al carrito <i class="bi bi-plus-circle"></i></button></p>
            </div>
            </div>
        </div>`;
        }
        contenidoHTML.innerHTML = productosHTML;
        
        // Aplico mi animación
        const elementos = document.querySelectorAll('.col-md-3');
        elementos.forEach((elemento, index) => {
            setTimeout(() => {
                elemento.classList.add('animate__zoomIn');
            }, index * 100);
        });
    })
    .catch(error => console.error('Error al cargar los productos', error));
}



cargarProductosJSON();
renderBotonCarrito();
