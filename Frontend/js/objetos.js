const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("infoUsuario").innerText =
    `Rol actual: ${rol}`;

document.addEventListener("DOMContentLoaded", cargarObjetos);


function cargarObjetos() {

    const busqueda =
        document.getElementById("busqueda").value;

    const categoria =
        document.getElementById("categoria").value;

    const precio =
        document.getElementById("precio").value;


    fetch(
        `http://localhost:3000/api/objetos?busqueda=${busqueda}&categoria=${categoria}&precio=${precio}`,
        {
            headers: {
                Authorization: token
            }
        }
    )

        .then(res => res.json())
        .then(data => {

            const lista = document.getElementById("listaObjetos");

            lista.innerHTML = "";

            data.forEach(obj => {

                lista.innerHTML += `

                <div class="card">

                    <h3>${obj.titulo}</h3>

                    <p>${obj.descripcion}</p>

                    <p>
                        <strong>Categoría:</strong>
                        ${obj.categoria}
                    </p>

                    <p class="precio">
                        $${obj.precio_dia} por día
                    </p>

                    <br>

                    <button onclick="verObjeto('${obj.id}')">
                        Ver detalle
                    </button>

                    ${renderBotones(obj)}

                </div>

            `;

            });

        });

}


function renderBotones(obj) {

    // solo propietario y administrador ven el botón
    if (rol === "propietario" || rol === "administrador") {

        return `

            <button class="btn-rojo"
                    onclick="eliminarObjeto('${obj.id}')">

                Eliminar

            </button>

        `;

    }

    return "";

}


function verObjeto(id) {

    window.location.href =
        `verobjeto.html?id=${id}`;

}


function eliminarObjeto(id) {

    if (!confirm("¿Eliminar este objeto?")) {
        return;
    }

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


function limpiarFiltros() {

    document.getElementById("busqueda").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";

    cargarObjetos();

}


function volver() {

    window.location.href = "dashboard.html";

}


function cerrarSesion() {

    localStorage.clear();

    window.location.href = "login.html";

}