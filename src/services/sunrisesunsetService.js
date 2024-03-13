import {useHttp} from '../hooks/http.hook';

const useSunrisesunsetService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'https://api.sunrisesunset.io/json?';

    const getSunrisesunset = async (lat, lon) => {
        const data = await request(`${_apiBase}lat=${lat}&lng=${lon}`);
        return _transformSunrisesunset(data);
    }

    const _transformSunrisesunset = (res) => {
        return {
            sunrise: convertTimeTo24HourFormat(res.results.sunrise),
            sunset: convertTimeTo24HourFormat(res.results.sunset),
        }
    }

    const convertTimeTo24HourFormat = (time) => {
        const [timePart, period] = time.split(/\s+/);
        const [hours, minutes] = timePart.split(':').map(part => parseInt(part));
    
        let convertedHours = hours;
    
        if (period === 'PM' && hours < 12) {
            convertedHours += 12;
        } else if (period === 'AM' && hours === 12) {
            convertedHours = 0;
        }
    
        const formattedHours = String(convertedHours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}`;
    }

    return {loading, error, getSunrisesunset};
}

export default useSunrisesunsetService;