// Creo Funciones para Gestionar el Carrito
function agregarCarrito (id) {
    const producto = productos.find(item => item.id == id);
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("El producto fue agregado con exito!");
    renderBotonCarrito();
}

function eliminarCarrito(id) {
    const carrito = cargarCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
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
}

function cargarProductoLS() {
    let id = JSON.parse(localStorage.getItem("producto"));
    const producto = productos.find(item => item.id == id);
    return producto;
}

function guardarProductoLS(id) {
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

// funcion para gestionar el cupón
function recibir(){
    const cuponRecibido = document.getElementById("cupon").value.toUpperCase(); // Obtengo el contenido del input "Cupon"
    const cuponesValidos = ["CUPON10", "D3SCUENT70", "COMPR4GAM3R", "L11CH4"]; // Establesco un Array de cupones válidos
    
    let totalConDescuento = calcularTotal() * 0.9;
    let totalSinDescuento = calcularTotal();
    let mensaje;

if (cuponesValidos.includes(cuponRecibido)) { // Verifico si es o no Valido y disparo el mensaje correspondiente
    mensaje = `Su cupón fue aplicado con exito! Su monto a pagar es de:`;
    valorPrecioTotal = `$${totalConDescuento} ARS`;
} else {
    mensaje = `Lo sentimos, su cupón no es valido. Su monto a pagar es de:`;
    valorPrecioTotal = `$${totalSinDescuento} ARS`;
}
    document.getElementById("mensajeFinal").textContent = mensaje;
    document.getElementById("precioFinal").textContent = valorPrecioTotal;
}



