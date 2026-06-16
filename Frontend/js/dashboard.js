const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function agregarTarea() {

    const titulo = document.getElementById("titulo").value;

    fetch("http://localhost:3000/api/tareas", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },

        body: JSON.stringify({
            titulo
        })

    })

        .then(res => res.json())

        .then(data => {

            alert(data.mensaje);

            document.getElementById("titulo").value = "";

            cargarTareas();

        });
}

function cargarTareas() {

    fetch("http://localhost:3000/api/tareas", {

        headers: {
            "Authorization": token
        }

    })

        .then(res => res.json())

        .then(data => {

            const lista = document.getElementById("listaTareas");

            lista.innerHTML = "";

            data.forEach(tarea => {

                lista.innerHTML += `
                <li>
                    ${tarea.titulo}
                     <button onclick="eliminarTarea(${tarea.id})">
                        ❌
                     </button>
                </li>
                `;

            });

        });

}

function eliminarTarea(id) {

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/tareas/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: token
        }

    })

        .then(res => res.json())
        .then(data => {

            cargarTareas();

        });

}

function cerrarSesion() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

cargarTareas();