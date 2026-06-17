const token = localStorage.getItem("token");
const nombre = localStorage.getItem("nombre");
const rol = localStorage.getItem("rol");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("bienvenida").innerText =
    `Bienvenido ${nombre} (${rol})`;

function irObjetos() {
    window.location.href = "objetos.html";
}

function irPublicar() {
    window.location.href = "crearobjeto.html";
}

function cerrarSesion() {

    localStorage.clear();
    window.location.href = "login.html";

}