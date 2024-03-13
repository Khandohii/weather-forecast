import {useHttp} from '../hooks/http.hook';

const useOpenWeatherService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'http://api.openweathermap.org/data/2.5/weather?';
    const _apiIconsBase = 'https://openweathermap.org/img/wn/';
    const _apiKey = process.env.REACT_APP_API_KEY;

    const getForecast = async (lat, lon) => {
        const res = await request(`${_apiBase}lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);
        return _transformWeather(res);
    }

    const _transformWeather = (res) => {
        return {
            city: res.name,
            skyCondition: res.weather[0].main,
            windPower: res.wind.speed,
            currentTemperature: res.main.temp,
            windDirection: res.wind.deg,
            feelsLikeTemp: res.main.feels_like,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            iconUrl: `${_apiIconsBase}${res.weather[0].icon}@2x.png`,
            country: res.sys.country,
        }
    }

    return {loading, error, getForecast};
}

export default useOpenWeatherService;