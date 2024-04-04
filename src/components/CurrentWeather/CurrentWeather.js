import { useState, useEffect } from 'react';
import './CurrentWeather.scss';
import Spinner from '../Spinner/spinner';
import useOpenWeatherService from '../../services/openWeatherService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const CurrentWeather = (props) => {
    const [currentWeatherData, setCurrentWeatherData] = useState([]);

    const {loading, error, getCurrentWeather} = useOpenWeatherService();
    

    useEffect(() => {
        updateDay();
    }, [props.coords]);

    function updateDay() {
        const {coords} = props;
        if (!coords) {
            return;
        }
        getCurrentWeather(...coords)
            .then(onCurrentWeatherLoaded);
    }

    const onCurrentWeatherLoaded = (data) => {
        setCurrentWeatherData(data);
    }

    console.log(props.locationLoading);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading || props.weatherLoading || props.locationLoading ? <Spinner /> : null;
    const content = !(spinner || error) ? <View data={currentWeatherData} hourlyList={props.hourlyList} coords={props.coords} city={props.city} sunset={props.sunset} sunrise={props.sunrise} /> : null;
    
    return(
        <div className="current-weather sect-marg">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = (props) => {
    const {currentTemperature, skyCondition, feelsLikeTemp, humidity, windPower, pressure, iconUrl} = props.data;
    const {city, sunset, sunrise} = props;

    return (
        <>
            <div className="current-weather__city">{city}</div>

            <div className="current-weather__temperature">{currentTemperature} &deg;C</div>

            <div className="current-weather__sky-condition">{skyCondition}</div>

            <div className="current-weather__sky-condition-icon">
                <img src={iconUrl + '@2x.png'} alt={skyCondition} />
            </div>

            <Hours hourlyList={props.hourlyList} />

            <hr />

            <div className="sunrize-sunset">
                <div className="sunrize-sunset__info">
                    <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7256 0.506877C16.8272 0.40502 16.9479 0.324207 17.0808 0.269068C17.2137 0.213929 17.3561 0.185547 17.5 0.185547C17.6439 0.185547 17.7863 0.213929 17.9192 0.269068C18.0521 0.324207 18.1728 0.40502 18.2744 0.506877L21.5556 3.78813C21.6573 3.88982 21.738 4.01055 21.793 4.14341C21.8481 4.27628 21.8764 4.41869 21.8764 4.5625C21.8764 4.70632 21.8481 4.84872 21.793 4.98159C21.738 5.11446 21.6573 5.23519 21.5556 5.33688C21.4539 5.43857 21.3332 5.51924 21.2003 5.57427C21.0675 5.62931 20.9251 5.65763 20.7812 5.65763C20.6374 5.65763 20.495 5.62931 20.3622 5.57427C20.2293 5.51924 20.1086 5.43857 20.0069 5.33688L18.5937 3.92156V7.84375C18.5937 8.13383 18.4785 8.41203 18.2734 8.61715C18.0683 8.82227 17.7901 8.9375 17.5 8.9375C17.2099 8.9375 16.9317 8.82227 16.7266 8.61715C16.5215 8.41203 16.4062 8.13383 16.4062 7.84375V3.92156L14.9931 5.33688C14.8914 5.43857 14.7707 5.51924 14.6378 5.57427C14.505 5.62931 14.3626 5.65763 14.2187 5.65763C14.0749 5.65763 13.9325 5.62931 13.7997 5.57427C13.6668 5.51924 13.5461 5.43857 13.4444 5.33688C13.3427 5.23519 13.262 5.11446 13.207 4.98159C13.1519 4.84872 13.1236 4.70632 13.1236 4.5625C13.1236 4.41869 13.1519 4.27628 13.207 4.14341C13.262 4.01055 13.3427 3.88982 13.4444 3.78813L16.7256 0.506877ZM5.12531 7.50031C5.33042 7.29527 5.60857 7.18008 5.89859 7.18008C6.18861 7.18008 6.46676 7.29527 6.67187 7.50031L9.765 10.5934C9.96423 10.7997 10.0745 11.076 10.072 11.3628C10.0695 11.6496 9.95446 11.9239 9.75167 12.1267C9.54888 12.3295 9.27456 12.4445 8.98778 12.447C8.701 12.4495 8.42472 12.3392 8.21843 12.14L5.12531 9.04688C4.92026 8.84177 4.80507 8.56362 4.80507 8.2736C4.80507 7.98357 4.92026 7.70542 5.12531 7.50031ZM29.8747 7.50031C30.0797 7.70542 30.1949 7.98357 30.1949 8.2736C30.1949 8.56362 30.0797 8.84177 29.8747 9.04688L26.7816 12.14C26.6807 12.2445 26.56 12.3278 26.4265 12.3851C26.2931 12.4424 26.1496 12.4726 26.0043 12.4739C25.8591 12.4751 25.7151 12.4475 25.5807 12.3925C25.4463 12.3375 25.3241 12.2563 25.2214 12.1536C25.1187 12.0509 25.0375 11.9287 24.9825 11.7943C24.9275 11.6599 24.8999 11.5159 24.9011 11.3707C24.9024 11.2254 24.9326 11.0819 24.9899 10.9485C25.0472 10.815 25.1305 10.6943 25.235 10.5934L28.3281 7.50031C28.5332 7.29527 28.8114 7.18008 29.1014 7.18008C29.3914 7.18008 29.6696 7.29527 29.8747 7.50031ZM17.5 13.3125C18.6521 13.3121 19.784 13.6151 20.782 14.191C21.7799 14.7668 22.6086 15.5952 23.1848 16.5929C23.761 17.5906 24.0644 18.7224 24.0645 19.8745C24.0646 21.0266 23.7614 22.1585 23.1853 23.1563H11.8125C11.2363 22.1583 10.9331 21.0263 10.9333 19.874C10.9335 18.7216 11.2371 17.5897 11.8135 16.5919C12.39 15.5942 13.2191 14.7658 14.2173 14.1901C15.2155 13.6145 16.3477 13.3118 17.5 13.3125ZM25.6156 23.1563C26.152 21.8281 26.354 20.3886 26.2041 18.9641C26.0542 17.5396 25.5569 16.1737 24.7558 14.9863C23.9548 13.7989 22.8744 12.8263 21.6097 12.1539C20.345 11.4815 18.9345 11.1299 17.5022 11.1299C16.0698 11.1299 14.6594 11.4815 13.3946 12.1539C12.1299 12.8263 11.0496 13.7989 10.2485 14.9863C9.44747 16.1737 8.95015 17.5396 8.80024 18.9641C8.65033 20.3886 8.85241 21.8281 9.38875 23.1563H1.09156C0.80148 23.1563 0.52328 23.2715 0.318162 23.4766C0.113044 23.6817 -0.00218964 23.9599 -0.00218964 24.25C-0.00218964 24.5401 0.113044 24.8183 0.318162 25.0234C0.52328 25.2285 0.80148 25.3438 1.09156 25.3438H33.9041C34.1941 25.3438 34.4723 25.2285 34.6775 25.0234C34.8826 24.8183 34.9978 24.5401 34.9978 24.25C34.9978 23.9599 34.8826 23.6817 34.6775 23.4766C34.4723 23.2715 34.1941 23.1563 33.9041 23.1563H25.6134H25.6156ZM-2.13645e-06 19.875C-2.13645e-06 19.5849 0.115232 19.3067 0.32035 19.1016C0.525468 18.8965 0.803667 18.7813 1.09375 18.7813H5.46875C5.75883 18.7813 6.03703 18.8965 6.24215 19.1016C6.44726 19.3067 6.5625 19.5849 6.5625 19.875C6.5625 20.1651 6.44726 20.4433 6.24215 20.6484C6.03703 20.8535 5.75883 20.9688 5.46875 20.9688H1.09375C0.803667 20.9688 0.525468 20.8535 0.32035 20.6484C0.115232 20.4433 -2.13645e-06 20.1651 -2.13645e-06 19.875ZM28.4375 19.875C28.4375 19.5849 28.5527 19.3067 28.7578 19.1016C28.963 18.8965 29.2412 18.7813 29.5312 18.7813H33.9062C34.1963 18.7813 34.4745 18.8965 34.6796 19.1016C34.8848 19.3067 35 19.5849 35 19.875C35 20.1651 34.8848 20.4433 34.6796 20.6484C34.4745 20.8535 34.1963 20.9688 33.9062 20.9688H29.5312C29.2412 20.9688 28.963 20.8535 28.7578 20.6484C28.5527 20.4433 28.4375 20.1651 28.4375 19.875Z" fill="white" />
                    </svg>

                    <div className="sunrize-sunset__time">{sunrise}</div>
                </div>

                <div className="sunrize-sunset__icon">
                    <svg width="369" height="108" viewBox="0 0 369 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="106.5" x2="367" y2="106.5" stroke="#CFDFEC" />
                        <path d="M1.13129 105.942C81 -33.0001 296.5 -33.5001 367.13 106.876" stroke="#FFF9F9" strokeWidth="2" />
                    </svg>
                </div>

                <div className="sunrize-sunset__info">
                    <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7256 8.61812C16.8272 8.71998 16.9479 8.80079 17.0808 8.85593C17.2137 8.91107 17.3561 8.93946 17.5 8.93946C17.6439 8.93946 17.7863 8.91107 17.9192 8.85593C18.0521 8.80079 18.1728 8.71998 18.2744 8.61812L21.5556 5.33687C21.6573 5.23518 21.738 5.11446 21.793 4.98159C21.848 4.84872 21.8764 4.70631 21.8764 4.5625C21.8764 4.41869 21.848 4.27628 21.793 4.14341C21.738 4.01054 21.6573 3.88982 21.5556 3.78812C21.4539 3.68643 21.3332 3.60577 21.2003 3.55073C21.0675 3.49569 20.9251 3.46737 20.7812 3.46737C20.6374 3.46737 20.495 3.49569 20.3622 3.55073C20.2293 3.60577 20.1086 3.68643 20.0069 3.78812L18.5937 5.20344V1.28125C18.5937 0.991169 18.4785 0.71297 18.2734 0.507852C18.0683 0.302734 17.7901 0.1875 17.5 0.1875C17.2099 0.1875 16.9317 0.302734 16.7266 0.507852C16.5215 0.71297 16.4062 0.991169 16.4062 1.28125V5.20344L14.9931 3.78812C14.8914 3.68643 14.7707 3.60577 14.6378 3.55073C14.505 3.49569 14.3626 3.46737 14.2187 3.46737C14.0749 3.46737 13.9325 3.49569 13.7996 3.55073C13.6668 3.60577 13.5461 3.68643 13.4444 3.78812C13.3427 3.88982 13.262 4.01054 13.207 4.14341C13.1519 4.27628 13.1236 4.41869 13.1236 4.5625C13.1236 4.70631 13.1519 4.84872 13.207 4.98159C13.262 5.11446 13.3427 5.23518 13.4444 5.33687L16.7256 8.61812ZM5.1253 7.5025C5.33041 7.29745 5.60856 7.18226 5.89858 7.18226C6.18861 7.18226 6.46676 7.29745 6.67186 7.5025L9.76499 10.5934C9.96422 10.7997 10.0745 11.076 10.072 11.3628C10.0695 11.6496 9.95446 11.9239 9.75167 12.1267C9.54887 12.3295 9.27455 12.4445 8.98777 12.447C8.70099 12.4495 8.42471 12.3392 8.21843 12.14L5.1253 9.04688C4.92026 8.84177 4.80507 8.56362 4.80507 8.27359C4.80507 7.98357 4.92026 7.70542 5.1253 7.50031V7.5025ZM29.8747 7.5025C30.0791 7.70752 30.1938 7.9852 30.1938 8.27469C30.1938 8.56418 30.0791 8.84186 29.8747 9.04688L26.7816 12.14C26.6807 12.2445 26.56 12.3278 26.4265 12.3851C26.2931 12.4424 26.1496 12.4726 26.0043 12.4739C25.8591 12.4751 25.7151 12.4475 25.5807 12.3925C25.4462 12.3375 25.3241 12.2563 25.2214 12.1536C25.1187 12.0509 25.0375 11.9287 24.9825 11.7943C24.9275 11.6599 24.8999 11.5159 24.9011 11.3707C24.9024 11.2254 24.9326 11.0819 24.9899 10.9485C25.0472 10.815 25.1305 10.6943 25.235 10.5934L28.3281 7.50031C28.5332 7.29527 28.8114 7.18008 29.1014 7.18008C29.3914 7.18008 29.6696 7.29527 29.8747 7.50031V7.5025ZM17.5 13.3125C18.6521 13.3121 19.784 13.6151 20.7819 14.191C21.7799 14.7668 22.6086 15.5952 23.1848 16.5929C23.761 17.5906 24.0644 18.7224 24.0645 19.8745C24.0646 21.0266 23.7614 22.1585 23.1853 23.1562H11.8125C11.2363 22.1583 10.9331 21.0263 10.9333 19.8739C10.9335 18.7216 11.2371 17.5897 11.8135 16.5919C12.39 15.5942 13.2191 14.7658 14.2173 14.1901C15.2155 13.6145 16.3477 13.3118 17.5 13.3125ZM25.6156 23.1562C26.1519 21.8281 26.354 20.3886 26.2041 18.9641C26.0542 17.5396 25.5569 16.1737 24.7558 14.9863C23.9548 13.7989 22.8744 12.8263 21.6097 12.1539C20.345 11.4815 18.9345 11.1299 17.5022 11.1299C16.0698 11.1299 14.6594 11.4815 13.3946 12.1539C12.1299 12.8263 11.0496 13.7989 10.2485 14.9863C9.44746 16.1737 8.95014 17.5396 8.80023 18.9641C8.65032 20.3886 8.8524 21.8281 9.38874 23.1562H1.09155C0.801472 23.1562 0.523273 23.2715 0.318155 23.4766C0.113037 23.6817 -0.00219727 23.9599 -0.00219727 24.25C-0.00219727 24.5401 0.113037 24.8183 0.318155 25.0234C0.523273 25.2285 0.801472 25.3438 1.09155 25.3438H33.904C34.1941 25.3438 34.4723 25.2285 34.6774 25.0234C34.8826 24.8183 34.9978 24.5401 34.9978 24.25C34.9978 23.9599 34.8826 23.6817 34.6774 23.4766C34.4723 23.2715 34.1941 23.1562 33.904 23.1562H25.6134H25.6156ZM-9.76585e-06 19.875C-9.76585e-06 19.5849 0.115224 19.3067 0.320342 19.1016C0.52546 18.8965 0.80366 18.7812 1.09374 18.7812H5.46874C5.75882 18.7812 6.03702 18.8965 6.24214 19.1016C6.44726 19.3067 6.56249 19.5849 6.56249 19.875C6.56249 20.1651 6.44726 20.4433 6.24214 20.6484C6.03702 20.8535 5.75882 20.9688 5.46874 20.9688H1.09374C0.80366 20.9688 0.52546 20.8535 0.320342 20.6484C0.115224 20.4433 -9.76585e-06 20.1651 -9.76585e-06 19.875ZM28.4375 19.875C28.4375 19.5849 28.5527 19.3067 28.7578 19.1016C28.963 18.8965 29.2412 18.7812 29.5312 18.7812H33.9062C34.1963 18.7812 34.4745 18.8965 34.6796 19.1016C34.8848 19.3067 35 19.5849 35 19.875C35 20.1651 34.8848 20.4433 34.6796 20.6484C34.4745 20.8535 34.1963 20.9688 33.9062 20.9688H29.5312C29.2412 20.9688 28.963 20.8535 28.7578 20.6484C28.5527 20.4433 28.4375 20.1651 28.4375 19.875Z" fill="white" />
                    </svg>

                    <div className="sunrize-sunset__time">{sunset}</div>
                </div>
            </div>


            <div className="current-weather__features">
                <div className="feature">
                    <div className="feature__val">{feelsLikeTemp} &deg;C</div>
                    <div className="feature__name">Feels Like</div>
                </div>

                <div className="feature">
                    <div className="feature__val">{humidity} %</div>
                    <div className="feature__name">Humidity</div>
                </div>

                <div className="feature">
                    <div className="feature__val">{windPower} m/s</div>
                    <div className="feature__name">W, force</div>
                </div>

                <div className="feature">
                    <div className="feature__val">{pressure} hPa</div>
                    <div className="feature__name">Pressure</div>
                </div>
            </div>
        </>
    )
}

const Hours = ({hourlyList}) => {
    const hoursMaxLength = 8;

    function renderItems(items) {
        const hours = items.map((item, i) => {
            if (hoursMaxLength <= i) return false;
    
            return(
                <div key={i} className="current-weather__hour">
                    <div className="current-weather__hour-time">{item.time}</div>
    
                    <div className="current-weather__hour-sky-state">
                        <img src={item.icon + '.png'} />
                    </div>
    
                    <div className="current-weather__hour-temperature">{item.temperature} &deg;C</div>
                </div>
            )
        })

        return hours;
    }

    const items = renderItems(hourlyList);

    return(
        <div className="current-weather__hours">
            {items}
        </div>
    )
}

export default CurrentWeather;
