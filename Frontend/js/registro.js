function registrar() {

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;
    const acepto = document.getElementById("acepto").checked;

    if (!acepto) {

        alert("Debes aceptar los términos y condiciones");

        return;

    }

    fetch("http://localhost:3000/api/registro", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre,
            correo,
            password,
            rol
        })

    })
        .then(res => res.json())
        .then(data => {

            alert(data.mensaje);

            if (data.mensaje === "Usuario registrado") {
                window.location.href = "login.html";
            }

        });

}