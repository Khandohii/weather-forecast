import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';

import App from './components/app/app';
// import WeatherService from './services/weatherService';


// const weatherService = new WeatherService();

// weatherService.getForecast().then(res => {
//     console.log(res);
// })

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
