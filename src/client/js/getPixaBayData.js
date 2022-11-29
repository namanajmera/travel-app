const url = "http://localhost:4000/";

// function calling for find fetch image
const getpixaBayImageDetails = async (args) => {
    const cObj = {
        code: args.country_code
    }
    fetchDetailsForCountryByCode(cObj).then(async (resData) => {
        let searchQuery = `${args.city_name} ${resData.country}`;
        searchQuery = encodeURIComponent(searchQuery);
        const res = await fetch(`https://pixabay.com/api/?key=${args.key}&q=${searchQuery}&image_type=photo`, args);
        try {
            let response = await res.json();
            if (response.hits.length) {
                Client.syncAllDataWithServer({ imageURL: response.hits[0].webformatURL });
                return response.hits[0];
            } else {
                const payload = { ...resData, ...args, city_name: resData.country }
                getpixaBayImageDetails(payload);
            }
        }
        catch (error) {
            console.log("Error ::", error);
        }
    })
}

// function for getting the country code from server
const fetchDetailsForCountryByCode = async (data) => {
    const response = await fetch(url + "fetchCountryCode", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch (error) {
        console.log("Error :: ", error);
    }
}


// function for fetching the pixbay key
const fetchpixaBayApiKey = async () => {
    const res = await fetch(url + 'receivePixaBayKey')
    try {
        return await res.json();
    }
    catch (error) {
        console.log("Error :: ", error);
    }
}


function fetchImageDataFullDetails(payload) {
    fetchpixaBayApiKey().then((resData) => {
        payload = { ...payload, ...resData };
        getpixaBayImageDetails(payload).then(function (resData = {}) {
            const data = resData;
        })
    })
}

export { fetchImageDataFullDetails }
