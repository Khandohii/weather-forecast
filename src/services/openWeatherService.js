import {useHttp} from '../hooks/http.hook';

const useOpenWeatherService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'http://api.openweathermap.org/data/2.5/';
    const _apiIconsBase = 'https://openweathermap.org/img/wn/';
    const _apiKey = process.env.REACT_APP_API_KEY;

    const getCurrentWeather = async (lat, lon) => {
        const res = await request(`${_apiBase}weather?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);
        return _transformWeather(res);
    }

    const getHourlyForecast = async (lat, lon) => {
        const res = await request(`${_apiBase}forecast?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);

        return res.list.map(item => transformHourlyForecast(item));
    }

    const transformHourlyForecast = (res) => {
        return {
            time: getFormattedTimeFromUnix(res.dt),
            icon: `${_apiIconsBase}${res.weather[0].icon}`,
            temperature: res.main.temp.toFixed(1),
        }
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
            iconUrl: `${_apiIconsBase}${res.weather[0].icon}`,
            country: res.sys.country,
        }
    }

    const getFormattedTimeFromUnix = (unixTime) => {
        const date = new Date(unixTime * 1000);
        const hours = date.getHours();
        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:00`;
      
        return formattedTime;
      }

    return {loading, error, getCurrentWeather, getHourlyForecast};
}

export default useOpenWeatherService;