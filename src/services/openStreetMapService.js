import {useHttp} from '../hooks/http.hook';

const useOpenStreetMapService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://nominatim.openstreetmap.org/';

    const getLocationData = async (cityName) => {
        const res = await request(`${_apiBase}search?q=${cityName}&format=json`);
        console.log(res);
        return _transformData(res);
    }

    const _transformData = (res) => {
        const result = res.map((el) => {
            return {
                coords: [el.lat, el.lon],
                display_name: el.display_name,
                name: el.name,
                id: el.osm_id
            }
        })

        return result;
    }

    return {loading, error, clearError, getLocationData};
}

export default useOpenStreetMapService;