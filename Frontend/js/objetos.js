const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

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

                    <button onclick="eliminarObjeto('${obj.id}')">
                        Eliminar
                    </button>

                </li>
            `;

            });

        });

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

    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("id_usuario");

    window.location.href = "login.html";

}