

class LocationService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getForecast = () => {
        return this.getResource('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
    }
}

export default WeatherService;