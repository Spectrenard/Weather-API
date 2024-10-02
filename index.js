const API_KEY = "063ee39dffd16303bcd60731f98d6b26";
const valueInput = document.getElementById("value");
const button = document.getElementById("searchButton");
const resultContainer = document.querySelector(".result");

async function fetchData(city) {
  resultContainer.innerHTML = "Chargement..."; // Indicateur de chargement
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    let data = await response.json();
    console.log(data);
    resultContainer.innerHTML = `
      <p>Météo à ${data.name} :</p>
      <p>${data.weather[0].description}</p>
      <p>Température : ${data.main.temp}°C</p>
      <p>Humidité : ${data.main.humidity}%</p>
      <p>Vitesse du vent : ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    resultContainer.innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
  } finally {
    console.log("Requête terminée !");
  }
}

button.addEventListener("click", () => {
  const city = valueInput.value.trim(); // Récupérer la valeur de l'input et enlever les espaces

  if (city) {
    fetchData(city); // Passer la ville à fetchData
  } else {
    resultContainer.innerHTML =
      '<p class="error">Veuillez entrer le nom d\'une ville !</p>'; // Afficher le message d'erreur
  }
});
