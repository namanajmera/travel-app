// fetch coordinates by city name
const getCoordinates = async (payload) => {
    const geonamesRes = await fetch(`http://api.geonames.org/searchJSON?q=${payload.city}&maxRows=1&username=${payload.username}`, payload);
    try {
        return await geonamesRes.json();
    }
    catch (error) {
        console.log("Error :: ", error);
    }
}


// function for getting the lat and long
function getLatLng(args) {
    getCoordinates(args).then(function (data) {
        if (!data.geonames.length) {
            alert("City not found!")
            return;
        }
        const payload = {
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng,
            date: args.date
        }
        Client.fetchAllWeatherInformation(payload);
    })
}
export { getLatLng }
