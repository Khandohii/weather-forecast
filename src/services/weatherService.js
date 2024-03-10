

class WeatherService {
    _apiBase = 'http://www.7timer.info/bin/api.pl?';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getForecast = (lat, lon) => {
        return this.getResource(`${this._apiBase}lon=${lon}&lat=${lat}&product=civil&output=json`)
    }
}

export default WeatherService;