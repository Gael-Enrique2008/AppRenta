const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let objetoActual = null;

document.addEventListener("DOMContentLoaded", cargarDetalle);

function cargarDetalle() {

    fetch("http://localhost:3000/api/objetos", {
        headers: {
            Authorization: token
        }
    })

        .then(res => res.json())
        .then(data => {

            objetoActual = data.find(obj => obj.id === id);

            if (!objetoActual) {
                document.getElementById("detalle").innerHTML =
                    "Objeto no encontrado";
                return;
            }

            document.getElementById("detalle").innerHTML = `
            <h3>${objetoActual.titulo}</h3>
            <p>${objetoActual.descripcion}</p>

            <p><strong>Categoria:</strong> ${objetoActual.categoria}</p>
            <p><strong>Restricciones:</strong> ${objetoActual.restricciones}</p>

            <p>Dia: $${objetoActual.precio_dia}</p>
            <p>Semana: $${objetoActual.precio_semana}</p>
            <p>Mes: $${objetoActual.precio_mes}</p>
        `;

        });

}

function rentarObjeto() {

    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_fin = document.getElementById("fecha_fin").value;

    if (!fecha_inicio || !fecha_fin) {
        alert("Selecciona fechas");
        return;
    }

    fetch("http://localhost:3000/api/reservas", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },

        body: JSON.stringify({
            objeto_id: id,
            fecha_inicio,
            fecha_fin
        })

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

        });

}