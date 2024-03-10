import {countries} from 'countries-list';

class GeoLocationService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getGeolocation = async () => {
        const data = await this.getResource(`https://ipinfo.io/json`);
        return this._transformGeolocation(data)
    }

    getGeolocationByBrowser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    return [latitude, longitude]
                },
                (error) => {
                    return null;
                }
            );
        }
    }

    _transformGeolocation = (res) => {
        return {
            coords: res.loc.split(','),
            city: res.city,
            country: this.getCountryFullName(res.country) || res.country,
        }
    }
    

    getCountryFullName = (countryCode) => {
        const countryFullName = countries[countryCode]?.name;

        return countryFullName;
    }
}

export default GeoLocationService;