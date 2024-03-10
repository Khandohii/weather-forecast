

class OpenWeatherService {
    _apiBase = 'http://api.openweathermap.org/data/2.5/weather?';
    _apiIconsBase = 'https://openweathermap.org/img/wn/';
    _apiKey = process.env.REACT_APP_API_KEY;
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getForecast = async (lat, lon) => {
        const res = await this.getResource(`${this._apiBase}lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric`);
        return this._transformWeather(res);
    }

    _transformWeather = (res) => {
        return {
            city: res.name,
            skyCondition: res.weather[0].main,
            windPower: res.wind.speed,
            currentTemperature: res.main.temp,
            windDirection: res.wind.deg,
            feelsLikeTemp: res.main.feels_like,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            iconUrl: `${this._apiIconsBase}${res.weather[0].icon}@2x.png`,
            country: res.sys.country,
        }
    }
}

export default OpenWeatherService;