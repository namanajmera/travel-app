// Function for getting the weatherbit data
const fetchAllWeatherBitData = async (args) => {
    const res = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${args.latitude}&lon=${args.longitude}&key=${args.key}`);
    try {
        let response = await res.json();
        return response.data[0];
    }
    catch (error) {
        console.log("Error :: ", error);
    }
}

// Function for getting the key of weatherbit from server
const fetchWeatherBitApiKey = async () => {
    const res = await fetch('http://localhost:4000/receiveWeatherBitApiKey')
    try {
        return await res.json();
    }
    catch (error) {
        console.log("Error ::", error);
    }
}


// Root funciton to perform the weatherbit data operation
function fetchAllWeatherInformation(payload) {
    fetchWeatherBitApiKey().then((response) => {
        payload = { ...payload, ...response };
        fetchAllWeatherBitData(payload).then((data) => {
            Client.syncAllDataWithServer({ weather: data.weather.description });
            Client.fetchImageDataFullDetails(data);
        })
    })
}


// Export fetchAllWeatherInformation function
export { fetchAllWeatherInformation }
