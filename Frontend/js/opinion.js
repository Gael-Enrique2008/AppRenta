const token = localStorage.getItem("token");

function enviarOpinion() {

    const reserva_id =
        localStorage.getItem("reservaSeleccionada");

    const calificacion =
        document.getElementById("calificacion").value;

    const comentario =
        document.getElementById("comentario").value;

    fetch("http://localhost:3000/api/opinion", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            Authorization: token

        },

        body: JSON.stringify({

            reserva_id,
            calificacion,
            comentario

        })

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

            window.location.href = "misrentas.html";

        });

}