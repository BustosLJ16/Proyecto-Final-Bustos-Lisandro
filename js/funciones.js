let productos = [];
// Función para obtener productos desde JSON
async function obtenerProductosJSON() {
    try {
        const response = await fetch('json/productos.json');
        const data = await response.json();
        productos = data;
        return productos; // Devuelve los productos cargados
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}
obtenerProductosJSON();

// Creo Funciones para Gestionar el Carrito
function agregarCarrito (id) {
    const producto = productos.find(item => item.id == id);
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("El producto fue agregado con exito!");
    renderBotonCarrito();
    alertaAgregarCarrito();
}

// Función que dispara una alerta de Toastify al agregar al carrito
function alertaAgregarCarrito() {
    Toastify({
        text: "¡El producto Se agregó Correctamente!",
        duration: 3000
        }).showToast();
}

// Función que dispara una alerta de Toastify al eliminar el carrito
function alertaEliminarDelCarrito() {
    Toastify({
        text: "¡El producto Se eliminó Correctamente!",
        duration: 3000
        }).showToast();
}

// Función que dispara una alerta de Toastify al eliminar el carrito
function alertaVaciarCarrito() {
    Toastify({
        text: "¡El carrito se vacio Correctamente!",
        duration: 3000
        }).showToast();
}

function eliminarCarrito(id) {
    const carrito = cargarCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    alertaEliminarDelCarrito();
}

function renderBotonCarrito() {
    let total = totalProductos();
    document.getElementById("totalDelCarrito").innerHTML = total;
}

function totalProductos () {
const carrito = cargarCarritoLS()
return carrito.length;
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    console.log("El carrito se ha vaciado correctamente!");
    alertaVaciarCarrito();
}

// Función para cargar el producto desde "localStorage"
function cargarProductoLS() {
    const id = JSON.parse(localStorage.getItem("producto"));
    return productos.find(item => item.id == id);
}
function idProductoDetallado(id) { // Obtiene el ID del producto, y lo refleja de forma detallada en producto.html
    localStorage.setItem("producto", JSON.stringify(id));
}

// Creo una función para dar la cuenta final de mis productos.
function calcularTotal() {
    let totalPrecio = 0;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    for (let i = 0; i < carrito.length; i++) { // Recorro el array de carrito y sumo el total (0) con el precio de cada producto
        totalPrecio += carrito[i].precio;
    }

    return totalPrecio;
}

// Array de cupones válidos
const cuponesValidos = ["CUPON10", "D3SCUENT70", "COMPR4GAM3R", "L11CH4"];

// Función para recibir el cupón y mostrar el mensaje final
function recibirCupon() {
    const cuponRecibido = document.getElementById("cupon").value.toUpperCase(); // Obtengo el contenido del input "Cupon"

    let totalConDescuento = calcularTotal() * 0.9;
    let totalSinDescuento = calcularTotal();
    let mensaje;
    let valorPrecioTotal;

    if (cuponesValidos.includes(cuponRecibido)) { // Verifico si el cupón es válido
        mensaje = `Su cupón fue aplicado con éxito! Su monto a pagar es de: $`;
        valorPrecioTotal = `${totalConDescuento} ARS`;
        alertaCupon(cuponRecibido);
    } else {
        mensaje = `Lo sentimos, su cupón no es válido. Su monto a pagar es de: $`;
        valorPrecioTotal = `${totalSinDescuento} ARS`;
        alertaCupon(cuponRecibido);
    }

    // Actualizo el mensaje final y el precio en el DOM
    document.getElementById("mensajeFinal").textContent = mensaje;
    document.getElementById("precioFinal").textContent = valorPrecioTotal;
}

// Función para ejecutar la alerta del cupón
function alertaCupon(cuponRecibido) {
    if (cuponesValidos.includes(cuponRecibido)) { // Verifico si el cupón es válido
        Swal.fire({
            icon: "success",
            title: "¡Felicidades!",
            text: "El cupón es válido. Ahora tienes un 10% de descuento.",
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos,",
            text: "Tu cupón no es válido.",
        });
    }
}

// Función para ejecutar el pago
function obtenerPago() {
    let seccionDePagos = "";

    if (totalProductos() > 0) {
        seccionDePagos = `<div class=" border border-dark rounded">
            <h5 class="my-4 display-6 text-dark">Pago</h5>
            <form id="formPago" class="row justify-content-center">
                <div class="col-auto">
                    <input type="text" class="form-control text-center" id="inputNombre" placeholder="Ingrese su Nombre">
                </div>
                <div class="col-auto">
                    <input type="number" class="form-control text-center" id="inputTarjeta" placeholder="Ingrese su Tarjeta">
                </div>
                <div class="col-auto">
                    <input type="number" class="form-control text-center" id="inputCVV" placeholder="Ingrese su CVV">
                </div>
                <div class="col-auto">
                    <input type="month" class="form-control text-center" id="inputFechaCaducidad" placeholder="Fecha de vencimiento">
                </div>
                <div class="col-auto">
                    <button type="submit" id="botonConfirmarPago" class="btn btn-primary mb-3">Confirmar Pago</button>
                </div>
            </form>
        </div>`;
    }

    document.getElementById("casillaDePago").innerHTML = seccionDePagos;

    const formPago = document.getElementById("formPago");
    if (formPago) {
        formPago.addEventListener("submit", function(event) {
            event.preventDefault();
            if (validarCamposForm()) {
                generarNumeroAleatorio();
            }
        });
    }
}

// Función para validar campos del Formulario
function validarCamposForm() {
    let campoNombre = document.getElementById("inputNombre").value;
    let campoTarjeta = document.getElementById("inputTarjeta").value;
    let campoCVV = document.getElementById("inputCVV").value;
    let campoFechaCaducidad = document.getElementById("inputFechaCaducidad").value;

    // Verificación si los campos están llenos o vacios.
    if (campoNombre === "") {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "Al parecer está vacío el campo Nombre.",
        });
        return false;
    }

    if (campoTarjeta === "") {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "Al parecer está vacío el campo de su Tarjeta.",
        });
        return false;
    }

    if (campoCVV === "") {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "Al parecer está vacío el campo de tu Clave de seguridad.",
        });
        return false;
    }

    if (campoFechaCaducidad === "") {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "Al parecer está vacío el campo de la Fecha de caducidad.",
        });
        return false;
    }

    // Todos los campos están llenos
    return true;
}

// Función para arrojar pago procesado o denegado, según un sistema de número aleatorio con Math
function generarNumeroAleatorio() {
    let numeroAleatorio = Math.random(); // Genero un numero aleatorio
    let numeroRedondeado = Math.round(numeroAleatorio); // Redondeo el número

    // Verifica si el número es 1 (Pago procesado) o 0 (Pago denegado)
    if (numeroRedondeado === 1) { //Alerta de pago procesado.
    Swal.fire({
        icon: "success",
        title: "¡Felicidades!",
        text: "Tu pago fue procesado.",
    });
    return true;
    } else { // Alerta de pago denegado.
        Swal.fire({ 
            icon: "error",
            title: "Lo sentimos...",
            text: "No pudimos procesar tu pago. Intentalo más tarde.",
        });
        return false;
    }
}

