const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const objeto_id = params.get("id");

if (!token) {
    window.location.href = "login.html";
}

function guardarDisponibilidad() {

    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_fin = document.getElementById("fecha_fin").value;

    fetch("http://localhost:3000/api/disponibilidad", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },

        body: JSON.stringify({
            objeto_id,
            fecha_inicio,
            fecha_fin
        })

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

        });

}