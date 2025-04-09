import {useHttp} from '../hooks/http.hook';

const useOpenCageDataService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://api.opencagedata.com/geocode/v1/json?';
    const _apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

    const getLocationData = async (lat, lon) => {
        const res = await request(`${_apiBase}q=${lat},${lon}&key=${_apiKey}`);
        return _transformData(res);
    }

    const _transformData = (res) => {
        return {
            city: res.results[0].components.postal_city,
            country: res.results[0].components.country,
        }
    }

    return {loading, error, clearError, getLocationData};
}

export default useOpenCageDataService;