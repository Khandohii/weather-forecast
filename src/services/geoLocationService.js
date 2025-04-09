import { countries } from 'countries-list';
import { useHttp } from '../hooks/http.hook';

const useGeoLocationService = () => {
    const {loading, error, request, clearError} = useHttp();

    const getGeolocation = async () => {
        const data = await request(`https://ipinfo.io/json`);
        return _transformGeolocation(data)
    }

    const getGeolocationByBrowser = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve([ latitude, longitude ]);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }

    const _transformGeolocation = (res) => {
        console.log(res);
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