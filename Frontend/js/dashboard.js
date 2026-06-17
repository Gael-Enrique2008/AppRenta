const token = localStorage.getItem("token");
const nombre = localStorage.getItem("nombre");
const rol = localStorage.getItem("rol");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("bienvenida").innerText =
    `Bienvenido ${nombre} (${rol})`;

const menu = document.getElementById("menu");

if (rol === "arrendatario") {

    menu.innerHTML = `
        <button onclick="irObjetos()">Ver objetos</button>
        <button onclick="irMisRentas()">Mis rentas</button>
    `;

}

else if (rol === "propietario") {

    menu.innerHTML = `
        <button onclick="irObjetos()">Ver objetos</button>
        <button onclick="irPublicar()">Publicar objeto</button>
        <button onclick="irPanelPropietario()">Mis reservas</button>
    `;

}

else if (rol === "administrador") {

    menu.innerHTML = `
        <button onclick="irObjetos()">Ver objetos</button>
        <button onclick="irPublicar()">Publicar objeto</button>
        <button onclick="irPanelPropietario()">Panel propietario</button>
    `;

}

function irObjetos() {
    window.location.href = "objetos.html";
}

function irPublicar() {
    window.location.href = "crearobjeto.html";
}

function irMisRentas() {
    window.location.href = "misrentas.html";
}

function irPanelPropietario() {
    window.location.href = "panelpropietario.html";
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}