function showWeather() {
    const output = document.getElementById('weather-output');
    if (!navigator.geolocation) {
        output.textContent = 'Geolocation is not supported by your browser.';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = '9436dabb36f24235b9a142129252508';
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('No Data Found for the given location');
                const data = await response.json();
                const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
                const temp = data.current.temp_c;
                output.innerHTML = `
                                        <strong>Location:</strong> ${location}
                                        <br>
                                        <strong>Temperature:</strong> ${temp} °C
                                    `;
            } catch (err) {
                output.textContent = 'Error fetching weather: ' + err.message;
            }
        },
        function(error) {
            output.textContent = 'Error getting location: ' + error.message;
        }
    );
}

window.addEventListener('DOMContentLoaded', showWeather);