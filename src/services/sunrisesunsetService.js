

class SunrisesunsetService {
    _apiBase = 'https://api.sunrisesunset.io/json?';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getSunrisesunset = async (lat, lon) => {
        const data = await this.getResource(`${this._apiBase}lat=${lat}&lng=${lon}`);
        return this._transformSunrisesunset(data);
    }

    _transformSunrisesunset = (res) => {
        return {
            sunrise: this.convertTimeTo24HourFormat(res.results.sunrise),
            sunset: this.convertTimeTo24HourFormat(res.results.sunset),
        }
    }

    convertTimeTo24HourFormat = (time) => {
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
}

export default SunrisesunsetService;