function registrar(){

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/registro", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo,
            password
        })

    })
    .then(res => res.json())
    .then(data => {
        alert(data.mensaje);
    });

}