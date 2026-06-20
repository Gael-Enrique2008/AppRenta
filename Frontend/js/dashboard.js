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

        <div class="card">

            <h3>Objetos disponibles</h3>

            <p>
                Explora los objetos publicados por otros usuarios.
            </p>

            <button onclick="irObjetos()">
                Ver objetos
            </button>

        </div>

        <div class="card">

            <h3>Mis rentas</h3>

            <p>
                Consulta el historial y estado de tus reservas.
            </p>

            <button onclick="irMisRentas()">
                Ver mis rentas
            </button>

        </div>

    `;

}

else if (rol === "propietario") {

    menu.innerHTML = `

        <div class="card">

            <h3>Objetos disponibles</h3>

            <p>
                Consulta los objetos publicados en la plataforma.
            </p>

            <button onclick="irObjetos()">
                Ver objetos
            </button>

        </div>

        <div class="card">

            <h3>Publicar objeto</h3>

            <p>
                Agrega un nuevo objeto para ponerlo en renta.
            </p>

            <button onclick="irPublicar()">
                Publicar
            </button>

        </div>

        <div class="card">

            <h3>Panel de propietario</h3>

            <p>
                Administra tus publicaciones y las reservas recibidas.
            </p>

            <button onclick="irPanelPropietario()">
                Abrir panel
            </button>

        </div>

    `;

}

else if (rol === "administrador") {

    menu.innerHTML = `

        <div class="card">

            <h3>Objetos disponibles</h3>

            <button onclick="irObjetos()">
                Ver objetos
            </button>

        </div>

        <div class="card">

            <h3>Publicar objeto</h3>

            <button onclick="irPublicar()">
                Publicar
            </button>

        </div>

        <div class="card">

            <h3>Panel propietario</h3>

            <button onclick="irPanelPropietario()">
                Abrir panel
            </button>

        </div>

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