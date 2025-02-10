const city = document.getElementById('city');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const apiKey = 'daafc66055210f5e5d0c57a30a2b1e7d';

searchBtn.addEventListener('click', () => {
    if (city.value.trim() !== '') {
        updateWeatherInfo(city.value);
        city.value = '';
       
    }
});

city.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && city.value.trim() !== '') {
        updateWeatherInfo(city.value);
        city.value = '';
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw new Error('Vérifier la clé API et le nom de la ville.');
    }
}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchData('weather', city);
        console.log(weatherData);
        
        weatherInfo.innerHTML = `
            <h2>Météo de ${weatherData.name}</h2>
            <p><strong>Température :</strong> ${weatherData.main.temp}°C</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = 'Vérifier la ville et réessayer.';
        console.error('Erreur lors de la récupération des données :', error);
    }
}
