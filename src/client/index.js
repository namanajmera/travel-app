import { handleFormSubmit, syncAllDataWithServer, handleReset } from './js/handleForm';
import { fetchAllWeatherInformation } from './js/searchWeather';
import { getLatLng } from './js/getGeoNameCoordinates';
import { fetchImageDataFullDetails } from './js/getPixaBayData';
import { getUpdatedData } from './js/getUpdatedInformation';

import './styles/form.scss';
import './styles/footer.scss';
import './styles/header.scss';

export {
    handleFormSubmit,
    handleReset,
    syncAllDataWithServer,
    getLatLng,
    fetchAllWeatherInformation,
    getUpdatedData,
    fetchImageDataFullDetails,
}