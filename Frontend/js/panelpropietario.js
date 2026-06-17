const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", cargar);

function cargar() {

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