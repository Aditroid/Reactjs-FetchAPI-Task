import { observer } from 'mobx-react-lite';
import dataStore from '../store/DataStore';

const WeatherTool = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    dataStore.fetchWeatherData();
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => dataStore.setCurrentTool('home')}
          className="mr-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Weather Lookup</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="City or Country"
              value={dataStore.weatherLocation}
              onChange={(e) => dataStore.setWeatherLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={dataStore.isLoading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                dataStore.isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {dataStore.isLoading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>
        </form>
      </div>

      
      {dataStore.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{dataStore.error}</span>
          </div>
        </div>
      )}

      
      {dataStore.weatherData && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-1">{dataStore.weatherData.location.name}</h2>
                <p className="text-white font-medium">
                  {dataStore.weatherData.location.region}, {dataStore.weatherData.location.country}
                </p>
                <p className="text-sm text-white mt-1">
                  Local time: {dataStore.weatherData.location.localtime}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{dataStore.weatherData.current.temperature}°C</div>
                <p className="text-xl">{dataStore.weatherData.current.weather_descriptions[0]}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Feels Like</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.weatherData.current.feelslike}°C</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Humidity</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.weatherData.current.humidity}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Wind Speed</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.weatherData.current.wind_speed} km/h</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Pressure</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.weatherData.current.pressure} mb</p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {dataStore.weatherHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Searches</h3>
          <div className="space-y-4">
            {dataStore.weatherHistory.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.location.name}, {item.location.country}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{item.current.temperature}°C</p>
                    <p className="text-sm text-gray-600">{item.current.weather_descriptions[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(WeatherTool);
