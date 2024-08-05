function renderCarrito(){
    const carrito = cargarCarritoLS();
    let contenidoHTML = `<table class="table">
    <tbody>
    <tr>
    <td class="text-end" colspan="4"><button class="btn btn-danger brn-sm" onclick="vaciarCarrito();">Vaciar carrito <i class="bi bi-trash3-fill"></i></button></td>
    </tr>`;
    if (totalProductos() > 0) {
        for (const producto of carrito){
            contenidoHTML += `<tr>
            <td><img src="../assets/imagenes-productos/${producto.imagen}" alt="${producto.nombre}" width="48"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="text-center align-middle"><span class="card-text text-center text-danger">$${producto.precio} ARS</span></td>
            <td class="text-end align-middle"><button class="btn btn-danger btn-sm" onclick="eliminarCarrito(${producto.id});";">Eliminar <i class="bi bi-x-circle"></i></button></td>
            </tr>`
        }
        contenidoHTML += `<tr>
            <td></td>
            <td></td>
            <td class="text-center align-middle">
            <span class="card-text text-center text-danger"><p>Su total a pagar es de:</p> <p><strong> $${calcularTotal()} ARS</strong></p></span></td>
            </tr>`
        contenidoHTML += `<tr>
            <td><input type="text" class="form-control" id="cupon" placeholder="Ingrese Su cupón Aquí"></td>
            <td><button type="button" class="btn btn-primary mb-3" name="Enviar" value="Enviar" onclick="recibir();">Confirmar Cupón</button></td>
            <td class="text-center align-middle">
                <span class="card-text text-center text-danger">
                    <p id="mensajeFinal"></p> <strong><p id="precioFinal"></p></strong>
                </span></td>
            </tr>`

        contenidoHTML +=`</tbody>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-dark my-5 text-center" role="alert">
        <h2>Lo sentimos mucho</h2>
        <h3>No se encontraron Productos en el Carrito!</h3>
        </div>`;
    }

    document.getElementById("contenidoCarrito").innerHTML = contenidoHTML;
}

renderCarrito();
renderBotonCarrito();