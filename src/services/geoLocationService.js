import { countries } from 'countries-list';
import { useHttp } from '../hooks/http.hook';

const useGeoLocationService = () => {
    const {loading, error, request, clearError} = useHttp();

    const getGeolocation = async () => {
        const data = await request(`https://ipinfo.io/json`);
        return _transformGeolocation(data)
    }

    const getGeolocationByBrowser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    return [latitude, longitude]
                }
            );
        }
    }

    const _transformGeolocation = (res) => {
        return {
            coords: res.loc.split(','),
            city: res.city,
            country: getCountryFullName(res.country) || res.country,
        }
    }
    

    const getCountryFullName = (countryCode) => {
        return countries[countryCode]?.name;
    }

    return {loading, error, getGeolocation, getGeolocationByBrowser, clearError}
}

export default useGeoLocationService;