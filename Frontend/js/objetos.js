const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("infoUsuario").innerText =
    `Rol actual: ${rol}`;

document.addEventListener("DOMContentLoaded", cargarObjetos);

function cargarObjetos() {

    fetch("http://localhost:3000/api/objetos", {
        headers: {
            Authorization: token
        }
    })

        .then(res => res.json())
        .then(data => {

            const lista = document.getElementById("listaObjetos");
            lista.innerHTML = "";

            data.forEach(obj => {

                lista.innerHTML += `
                <li>
                    <strong>${obj.titulo}</strong><br>
                    ${obj.descripcion}<br>
                    Día: $${obj.precio_dia}

                    <br><br>

                    <button onclick="verObjeto('${obj.id}')">
                        Ver
                    </button>

                    ${renderBotones(obj.id)}
                </li>
            `;
            });

        });

}

function renderBotones(id) {

    if (rol === "propietario" || rol === "administrador") {

        return `
            <button onclick="eliminarObjeto('${id}')">
                Eliminar
            </button>
        `;

    }
    return "";

}

function verObjeto(id) {

    window.location.href = `verobjeto.html?id=${id}`;

}

function eliminarObjeto(id) {

    fetch(`http://localhost:3000/api/objetos/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: token
        }

    })

    .then(res => res.json())
    .then(data => {

        alert(data.mensaje);
        cargarObjetos();

    });

}

function cerrarSesion() {

    localStorage.clear();
    window.location.href = "login.html";

}
function volver() {
    window.location.href = "dashboard.html";
}