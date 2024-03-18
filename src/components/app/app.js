import { useState, useEffect } from 'react';
import './App.scss';

import Header from '../AppHeader/AppHeader';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import Footer from '../AppFooter/AppFooter';
import AppBtn from '../AppBtn/AppBtn';

import useGeoLocationService from '../../services/geoLocationService';
import useSunrisesunsetService from '../../services/sunrisesunsetService';

export default function App() {
    const [coords, setCoords] = useState([56.1676288, 10.174464]);
    const [city, setCity] = useState("Aarhus");
    const [country, setCountry] = useState("Denmark");

    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);

    const {clearError, getGeolocation, getGeolocationByBrowser} = useGeoLocationService();
    const {getSunrisesunset} = useSunrisesunsetService();

    useEffect(() => {
        getSunrisesunset(...coords).then((res) => {
            setSunrise(res.sunrise);
            setSunset(res.sunset);
        });
    }, [coords])
    
    const getGeoposition = () => {
        getGeolocation()
            .then((res) => {
                setCoords(res.coords);
                setCity(res.city);
                setCountry(res.country);
            }).catch((e) => {
                clearError();
            })
    }
    
    const getGeopositionByBrowser = () => {
        getGeolocationByBrowser()
            .then((res) => {
                setCoords(res);
            }).catch((e) => {
                clearError();
            })
    }

    return (
        <div className="app">
            <Header city={city} country={country} />

            <div className="cont">
                <AppBtn className="sect-marg" clickFnc={getGeopositionByBrowser}>Get my geolocation</AppBtn>

                <CurrentWeather coords={coords} city={city} sunrise={sunrise} sunset={sunset} />
            </div>
            <Footer />
        </div>
    );
}