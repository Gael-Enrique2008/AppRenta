function login() {

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {

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

            if (data.mensaje === "Login correcto") {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            }

        });

}