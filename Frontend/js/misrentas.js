const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", cargar);

function cargar() {

    fetch("http://localhost:3000/api/mis-rentas", {
        headers: {
            Authorization: token
        }
    })

        .then(res => res.json())
        .then(data => {

            const lista = document.getElementById("listaRentas");

            lista.innerHTML = "";

            data.forEach(r => {

                lista.innerHTML += `
                <li>

                    <strong>${r.titulo}</strong><br>

                    ${r.fecha_inicio} → ${r.fecha_fin}<br>

                    Estado: ${r.estado}

                    <br><br>

                    ${
                        (r.estado === "pendiente" || r.estado === "aprobada")
                        ? `<button onclick="cancelarReserva('${r.id}')">
                                Cancelar reserva
                           </button>`
                        : ""
                    }

                </li>
            `;

            });

        });

}


function cancelarReserva(id) {

    if (!confirm("¿Deseas cancelar esta reserva?")) {
        return;
    }

    fetch(`http://localhost:3000/api/cancelar-reserva/${id}`, {

        method: "PUT",

        headers: {
            Authorization: token
        }

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

            cargar();

        });

}