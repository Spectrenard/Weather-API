const API_KEY = "063ee39dffd16303bcd60731f98d6b26";
const valueInput = document.getElementById("value") as HTMLInputElement;
const button = document.getElementById("searchButton") as HTMLButtonElement;
const resultContainer = document.querySelector(".result") as HTMLDivElement;

interface WeatherData {
  name: string;
  weather: { description: string }[]; // weather est un tableau
  main: { temp: number; humidity: number }; // temp et humidity sont dans "main"
  wind: { speed: number }; // wind contient la vitesse
}

async function fetchData(city: string): Promise<void> {
  // Changer ici le type de retour à void
  resultContainer.innerHTML = "Chargement..."; // Indicateur de chargement
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data: WeatherData = await response.json();
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
