function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");

    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function consultAPI(cityName) {
    let apikey = "7724e86003344770215dc7e2e88a9a1f"
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric&lang=es`)
        .then(Response => {
            if (Response.ok) return Response.json();
            throw new Error("error")
        })
        .then(data => {
            verClima(data);
        })

    .catch(error => {
        return "error"
    })
}

function verClima(data) {
    let ciudad = data.name;
    let icono = data.weather[0].icon;
    let temperatura = data.main.temp;
    let sensacionTermica = data.main.feels_like;
    let humedad = data.main.humidity;
    let viento = data.wind.speed;
    let presionAtm = data.main.pressure;

    let card = `<div class="card">
                    <h3>${ciudad}</h3>
                    <img src="http://openweathermap.org/img/wn/${icono}.png" alt="Imagen">
                    <p>Temperatura: ${temperatura}° </p>
                    <p>Sensacion: ${humedad}%</p>
                    <p>Velocidad del Viento: ${viento}km/h</p>
                    <p>Presion: ${presionAtm} P</p>
                </div>`


    let section = document.getElementById("mostrarCard");
    if (section) {
        section.innerHTML = "";
        section.innerHTML += card;
    }
}