import dataStore from '../store/DataStore';
import { jest } from '@jest/globals';

const axios = {
  get: jest.fn()
};

describe('DataStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dataStore.isLoading = false;
    dataStore.error = null;
    dataStore.weatherData = null;
    dataStore.weatherLocation = '';
    dataStore.weatherHistory = [];
  });

  describe('setCurrentTool', () => {
    test('should update currentTool and clear error', () => {
      dataStore.error = 'Some error';
      dataStore.setCurrentTool('weather');
      expect(dataStore.currentTool).toBe('weather');
      expect(dataStore.error).toBeNull();
    });
  });

  describe('fetchWeatherData', () => {
    test('should set error if location is empty', async () => {
      dataStore.weatherLocation = '';
      await dataStore.fetchWeatherData();
      expect(dataStore.error).toBe('Please enter a location');
      expect(dataStore.isLoading).toBe(false);
      expect(axios.get).not.toHaveBeenCalled();
    });

    test('should fetch weather data successfully', async () => {
      const mockResponse = {
        data: {
          location: {
            name: 'London',
            region: 'City of London',
            country: 'United Kingdom',
            localtime: '2023-05-14 12:00'
          },
          current: {
            temperature: 15,
            weather_descriptions: ['Partly cloudy'],
            feelslike: 14,
            humidity: 76,
            wind_speed: 11,
            pressure: 1012
          }
        }
      };
      axios.get.mockResolvedValueOnce(mockResponse);
      dataStore.weatherLocation = 'London';
      await dataStore.fetchWeatherData();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('London'));
      expect(dataStore.isLoading).toBe(false);
      expect(dataStore.weatherData).toEqual(mockResponse.data);
      expect(dataStore.error).toBeNull();
      expect(dataStore.weatherHistory.length).toBe(1);
      expect(dataStore.weatherHistory[0].location).toEqual(mockResponse.data.location);
    });

    test('should handle API error', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
      dataStore.weatherLocation = 'InvalidLocation';
      await dataStore.fetchWeatherData();
      expect(dataStore.isLoading).toBe(false);
      expect(dataStore.error).toBe(errorMessage);
      expect(dataStore.weatherData).toBeNull();
    });
  });

  describe('clearWeatherData', () => {
    test('should reset weather data and location', () => {
      dataStore.weatherData = { some: 'data' };
      dataStore.weatherLocation = 'London';
      dataStore.clearWeatherData();
      expect(dataStore.weatherData).toBeNull();
      expect(dataStore.weatherLocation).toBe('');
    });
  });
});
