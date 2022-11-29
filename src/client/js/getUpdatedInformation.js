// Function to get data from server
const getResponseDataFromServer = async () => {
    const response = await fetch("http://localhost:4000/getServerResponse", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
    try {
        return await response.json();
    } catch (error) {
        console.log("Error ::", error);
    }
};

// this funciton is reponsible for rendering the updated data in ui
function renderTheDataToUser(data) {
    let documentFragment = document.createDocumentFragment();
    let textDivElement = document.createElement('div');
    let imageDivElement = document.createElement('div');

    for (var dataKeyValue in data) {
        if (data.hasOwnProperty(dataKeyValue)) {
            if (dataKeyValue === 'imageURL') {
                let img = document.createElement('img');
                img.setAttribute("src", data[dataKeyValue]);
                imageDivElement.appendChild(img);
            } else {
                let paraTag = document.createElement('p');
                paraTag.innerText = `${dataKeyValue.charAt(0).toUpperCase()}${dataKeyValue.substring(1)}: ${data[dataKeyValue].toString().toUpperCase()}`;
                textDivElement.appendChild(paraTag);
            }
        }
    }

    document.getElementById('headerDetails').style.display = "none";
    document.getElementById('city').value = "";
    document.getElementById('date').value = "";
    documentFragment.appendChild(textDivElement);
    imageDivElement.setAttribute("class", "scale-height")
    documentFragment.appendChild(imageDivElement);
    let divElement = document.getElementById("dataCardInformation");
    divElement.appendChild(documentFragment);
}


// Function to get updated data
function getUpdatedData() {
    getResponseDataFromServer().then((resData) => {
        renderTheDataToUser(resData);
    })
}

// export getUpdatedData function data
export { getUpdatedData }
