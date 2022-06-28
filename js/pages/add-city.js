async function validateCity(nuevaciudad) {
    let cities = getCitiesFromLocalStorage();

    for (let i = 0; i < cities.length; i++) {
        if (nuevaciudad == cities[i]) {
            return "warning";
        };
    };

    if (await consultAPI(nuevaciudad) == "error") {
        return "error";
    } else {
        return "success";
    };
}

function removeMessage() {
    setTimeout(function() {
        document.getElementsByClassName("Alert")[0].remove();
    }, 3000);
}

async function addCityToLocalStorage() {
    let cities = getCitiesFromLocalStorage();
    let nuevaciudad = document.getElementById("IngresarCiudad").value;
    nuevaciudad = nuevaciudad.toUpperCase()

    switch (await validateCity(nuevaciudad)) {
        case "success":
            cities.push(nuevaciudad);
            localStorage.setItem("CITIES", JSON.stringify(cities));
            document.getElementById("messajeBox").innerHTML += successMessage;
            removeMessage();
            break;
        case "warning":
            document.getElementById("messajeBox").innerHTML += warningMessage;
            removeMessage();
            break;
        case "error":
            document.getElementById("messajeBox").innerHTML += errorMessage;
            removeMessage();
            break;
    };
};

let successMessage = '<p class="alert success">Ciudad Agregada con exito</p>';
let errorMessage = '<p class="alert error">Error: La ciudad ingresada no se encuentra en la API o se produjo un error al consultar</p>';
let warningMessage = '<p class="alert warning">La ciudad ingresada ya se encuentra almacenada</p>';

let buttonAddCity = document.getElementById("buttonAdd");
buttonAddCity.addEventListener("click", addCityToLocalStorage);