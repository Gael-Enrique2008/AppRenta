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
                    <div class="card">
                        <strong>${r.titulo}</strong>
                        <p>${r.fecha_inicio} → ${r.fecha_fin}</p>

                        <span class="badge">Estado: ${r.estado}</span>

                        <br><br>

                        ${r.estado === "pendiente" ? `
                            <button onclick="aprobar('${r.id}')">Aprobar</button>
                            <button onclick="rechazar('${r.id}')">Rechazar</button>
                        ` : ""}
                    </div>
                `;

            });

        });

}
function aprobar(id) {
    cambiarEstado(id, "aprobada");
}

function rechazar(id) {
    cambiarEstado(id, "rechazada");
}

function cambiarEstado(id, estado) {

    fetch("http://localhost:3000/api/reservas/estado", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },

        body: JSON.stringify({
            reserva_id: id,
            estado
        })

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);
            cargarReservas();

        });

}

function verDetalle(id) {
    window.location.href = `verobjeto.html?id=${id}`;
}
function verDisponibilidad(id) {
    window.location.href = `disponibilidad.html?id=${id}`;
}
function volver() {
    window.location.href = "dashboard.html";
}