import React, { createContext, useState, useContext } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [coords, setCoords] = useState([56.1676288, 10.174464]);

  return (
    <WeatherContext.Provider value={{ city, setCity, country, setCountry, coords, setCoords }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
