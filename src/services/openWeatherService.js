import {useHttp} from '../hooks/http.hook';
import {useState} from 'react';

const useOpenWeatherService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'https://api.openweathermap.org/data/2.5/';
    const _apiIconsBase = 'https://openweathermap.org/img/wn/';
    const _apiKey = process.env.REACT_APP_API_KEY_OPEN_WEATHER;
    const [timeZone, setTimeZone] = useState(null);

    const getCurrentWeather = async (lat, lon) => {
        const res = await request(`${_apiBase}weather?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);
        setTimeZone(res.timezone);
        return _transformWeather(res);
    }

    const getHourlyForecast = async (lat, lon) => {
        const res = await request(`${_apiBase}forecast?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);
        const finalResult = _transformHourlyForecast(res, timeZone)
        return finalResult;
    }

    const _transformHourlyForecast = (res) => {
        let result = {};
        const hourlyForecast = res.list.map(item => {
            return{
                time: convertToTime(item.dt, res.city.timezone),
                icon: `${_apiIconsBase}${item.weather[0].icon}`,
                temperature: _roundToOneDecimalPlace(item.main.temp)
            }
        })

        const dailyForecast = _groupByDay(res.list);

        result = Object.assign({hourlyForecast}, {dailyForecast});
        return result;
    }


    const _groupByDay = (data) => {
        const groupedData = {};

        data.forEach(item => {
            const date = new Date(item.dt_txt);
            const day = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

            if (!groupedData[day]) {
                groupedData[day] = {
                    dayOfWeek: getDayOfWeekFromUnixTime(item.dt),
                    minTemp: item.main.temp_min,
                    maxTemp: item.main.temp_max,
                    weather: {},
                    icon: {}
                };
            } else {
                if (item.main.temp_min < groupedData[day].minTemp) {
                    groupedData[day].minTemp = item.main.temp_min;
                }
                if (item.main.temp_max > groupedData[day].maxTemp) {
                    groupedData[day].maxTemp = item.main.temp_max;
                }
            }

            const weather = item.weather[0].main;
            const icon = item.weather[0].icon;

            if (!groupedData[day].weather[weather]) {
                groupedData[day].weather[weather] = 1;
            } else {
                groupedData[day].weather[weather]++;
            }

            if (!groupedData[day].icon[icon]) {
                groupedData[day].icon[icon] = 1;
            } else {
                groupedData[day].icon[icon]++;
            }
        });

        Object.keys(groupedData).forEach(date => {
            let maxWeather = '';
            let maxWeatherCount = 0;
            let maxIcon = '';
            let maxIconCount = 0;

            Object.keys(groupedData[date].weather).forEach(weather => {
                if (groupedData[date].weather[weather] > maxWeatherCount) {
                    maxWeather = weather;
                    maxWeatherCount = groupedData[date].weather[weather];
                }
            });

            Object.keys(groupedData[date].icon).forEach(icon => {
                if (groupedData[date].icon[icon] > maxIconCount) {
                    maxIcon = icon;
                    maxIconCount = groupedData[date].icon[icon];
                }
            });

            groupedData[date].weather = maxWeather;
            groupedData[date].icon = maxIcon;
        });

        return groupedData;
    };

    const _transformWeather = (res) => {
        return {
            city: res.name,
            skyCondition: res.weather[0].main,
            windPower: res.wind.speed,
            currentTemperature: _roundToOneDecimalPlace(res.main.temp),
            windDirection: res.wind.deg,
            feelsLikeTemp: _roundToOneDecimalPlace(res.main.feels_like),
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            iconUrl: `${_apiIconsBase}${res.weather[0].icon}`,
            country: res.sys.country,
        }
    }

    function convertToTime(timestampUTC, timezoneOffsetInSeconds) {
        const localTimestamp = (timestampUTC + timezoneOffsetInSeconds) * 1000;
        const date = new Date(localTimestamp);

        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    const _roundToOneDecimalPlace = (number) => {
        return Math.round(number * 10) / 10;
    };

    const getDayOfWeekFromUnixTime = (unixTime) => {
        const date = new Date(unixTime * 1000);

        const dayOfWeekNumber = date.getDay();

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return daysOfWeek[dayOfWeekNumber];
    }

    return {loading, error, getCurrentWeather, getHourlyForecast};
}

export default useOpenWeatherService;