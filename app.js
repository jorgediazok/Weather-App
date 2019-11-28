window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
long = position.coords.longitude;
lat = position.coords.latitude;
const proxy = "https://cors-anywhere.herokuapp.com/"; 

const api = `${proxy}https://api.darksky.net/forecast/b7a477bc6723fdd391a518c8d570cee8/${lat},${long}`;
fetch(api).then(response=>{
    return response.json();
}).then(data =>{
    const {temperature, summary, icon}= data.currently;

    //SET DOM elements from the API

    temperatureDegree.textContent= temperature;
    temperatureDescription.textContent = summary;
    locationTimezone.textContent = data.timezone;

    //Formula for Celsius
    let celsius = (temperature - 32) * (5/9);

    // Set Icon

    setIcons(icon, document.querySelector(".icon"));

    //Change Temperature to Celsius/Farenheit
    temperatureSection.addEventListener("click", () => {
        if (temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
        } else {(temperatureSpan.textContent ="F");
        temperatureDegree.textContent = temperature;  }

});

});

});


}

function setIcons(icon, iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //reemplaza el - por el _ y lo pone en mayuscula todo como en la api
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]) ;
}
});