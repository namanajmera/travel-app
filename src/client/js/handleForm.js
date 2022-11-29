const URL = 'http://localhost:4000/';

function getGeoUserNameKey(inputData) {
    fetch(URL + 'receiveGeoUserNameKey').then(res => {
        return res.json()
    }).then((data) => {
        data.date = inputData.date;
        data.city = inputData.city;
        Client.getLatLng(data)
    })
}

const syncData = async (formData) => {
    await fetch(URL + "syncAllDataWithServer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(formData)
    });
    try {
        return await formData;
    } catch (error) {
        console.log("Error ", error);
    }
}

function syncAllDataWithServer(formData) {
    syncData(formData).then((data) => {
        if (formData.imageURL) {
            Client.getUpdatedData(data);
        }
    })
}

function handleReset(event) {
    event.preventDefault()
    document.getElementById('city').value = "";
    document.getElementById('date').value = "";
    let divElement = document.getElementById("dataCardInformation");
    divElement.innerHTML = '';
    document.getElementById('headerDetails').style.removeProperty('display');
}

function handleFormSubmit(event) {
    event.preventDefault()
    document.getElementById("dataCardInformation").innerHTML = "";
    let cityValue = document.getElementById('city').value;
    let dateValue = document.getElementById('date').value;
    if ((!cityValue.length) && (!dateValue.length)) {
        alert("Please provide city name and date of travel for information.");
    } else if (!cityValue.length) {
        alert("Please provide city name for information.");
    } else if (!dateValue.length) {
        alert("Please provide date of travel for information.");
    } else {
        let inputData = { city: cityValue, date: dateValue }
        syncAllDataWithServer(inputData);
        getGeoUserNameKey(inputData);
    }
}


export { handleReset, handleFormSubmit, syncAllDataWithServer }