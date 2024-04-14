# Weather Forecast

The Weather Forecast application provides information about the current weather and forecasts for the next 5 days. Users can search for forecasts for specific cities or use geolocation to display local weather.

This app utilizes the [OpenWeatherMap API](https://openweathermap.org/) to retrieve weather forecasts and the [OpenCage API](https://opencagedata.com/) to obtain information about cities and countries based on geoposition.

**Demo:** [Weather Forecast App Example](https://weather-forecast-five-lyart.vercel.app/)

## Tech Stack

- **Functional Components**: Leveraging functional React components for efficient and reusable UI elements.
- **Loading Spinners and Error Handling**: Implementing loading spinners for loading states and visually handling errors.
- **Error Boundaries**: Using React error boundaries to catch and display errors without crashing the entire application.
- **React Hooks**: Applying React hooks to manage state and side effects.

## Getting Started

1. **Clone or Download**: Clone this repository to your computer or download it.

2. **Set Up API Keys**: Create a `.env` file in the root directory with your API keys for [OpenWeatherMap](https://openweathermap.org/) and [OpenCage](https://opencagedata.com/).

    ```plaintext
    REACT_APP_API_KEY_OPEN_WEATHER=yourKey
    REACT_APP_OPENCAGE_API_KEY=yourKey
    ```

    > **Note:** It's important to set up API keys in the `.env` file to use the application.

3. **Available Scripts**:

   - **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes, and any lint errors will be shown in the console.

   - **`npm run build`**: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Planned Features

- [ ] Search History: Implementing a feature to track previous searches.
- [ ] Favorite Cities: Allowing users to mark and save their favorite cities for quick access.
