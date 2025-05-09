import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './components/app/app';
import { WeatherProvider } from './context/WeatherContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <WeatherProvider>
        <App />
    </WeatherProvider>
);
