const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function crearObjeto() {

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const categoria = document.getElementById("categoria").value;
    const restricciones = document.getElementById("restricciones").value;
    const precio_dia = document.getElementById("precio_dia").value;
    const precio_semana = document.getElementById("precio_semana").value;
    const precio_mes = document.getElementById("precio_mes").value;

    fetch("http://localhost:3000/api/objetos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },

        body: JSON.stringify({
            titulo,
            descripcion,
            categoria,
            restricciones,
            precio_dia,
            precio_semana,
            precio_mes
        })

    })

        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

            if (data.mensaje === "Objeto creado") {
                window.location.href = "objetos.html";
            }

        });

}