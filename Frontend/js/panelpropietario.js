const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    cargarObjetos();
    cargarReservas();
});

function cargarObjetos() {

    fetch("http://localhost:3000/api/mis-objetos", {
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

                    <button onclick="verDisponibilidad('${obj.id}')">
                        Disponibilidad
                    </button>

                    <button onclick="verDetalle('${obj.id}')">
                        Ver
                    </button>

                </li>
            `;
            });

        });

}

function cargarReservas() {

    fetch("http://localhost:3000/api/reservas-propietario", {
        headers: {
            Authorization: token
        }
    })

        .then(res => res.json())
        .then(data => {

            const lista = document.getElementById("listaReservas");
            lista.innerHTML = "";

            data.forEach(r => {

                lista.innerHTML += `
                <li>
                    <strong>${r.titulo}</strong><br>
                    ${r.fecha_inicio} → ${r.fecha_fin}<br>
                    Estado: ${r.estado}
                </li>
            `;

            });

        });

}

function verDetalle(id) {
    window.location.href = `ver-objeto.html?id=${id}`;
}
function verDisponibilidad(id) {
    window.location.href = `disponibilidad.html?id=${id}`;
}