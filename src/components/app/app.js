import { useState, useEffect } from 'react';
import './App.scss';

import Header from '../appHeader/appHeader';
import Day from '../day/day';
import Footer from '../appFooter/appFooter';

import userGeoLocationService from '../../services/geoLocationService';
import useSunrisesunsetService from '../../services/sunrisesunsetService';

export default function App() {
    const [coords, setCoords] = useState([56.1676288, 10.174464]);
    const [city, setCity] = useState("Aarhus");
    const [country, setCountry] = useState("Denmark");

    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);

    const {clearError, getGeolocation} = userGeoLocationService();
    const {getSunrisesunset} = useSunrisesunsetService();


    useEffect(() => {
        // getGeoposition();

    }, [])

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

    return (
        <div className="app">
            <Header city={city} country={country} />

            <div className="cont">
                <Day coords={coords} city={city} sunrise={sunrise} sunset={sunset} />
            </div>
            <Footer />
        </div>
    );
}