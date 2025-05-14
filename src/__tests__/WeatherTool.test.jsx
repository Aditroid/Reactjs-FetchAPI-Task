import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import WeatherTool from '../components/WeatherTool';


const dataStore = {
  weatherLocation: '',
  weatherData: null,
  isLoading: false,
  error: null,
  setWeatherLocation: jest.fn(),
  fetchWeatherData: jest.fn(),
  setCurrentTool: jest.fn(),
  weatherHistory: []
};

describe('WeatherTool Component', () => {
  beforeEach(() => {

    jest.clearAllMocks();
  });

  test('renders weather search form correctly', () => {
    render(<WeatherTool />);


    expect(screen.getByText('Weather Lookup')).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Weather/i })).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(<WeatherTool />);


    const input = screen.getByLabelText(/Enter Location/i);


    fireEvent.change(input, { target: { value: 'London' } });


    expect(dataStore.setWeatherLocation).toHaveBeenCalledWith('London');
  });

  test('handles form submission correctly', () => {
    render(<WeatherTool />);


    const form = screen.getByRole('form');


    fireEvent.submit(form);


    expect(dataStore.fetchWeatherData).toHaveBeenCalled();
  });

  test('displays loading state correctly', () => {

    dataStore.isLoading = true;

    render(<WeatherTool />);


    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Loading.../i })).toBeDisabled();
  });

  test('displays error message when there is an error', () => {

    dataStore.error = 'Failed to fetch weather data';

    render(<WeatherTool />);


    expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument();
  });

  test('displays weather data when available', () => {

    dataStore.weatherData = {
      location: {
        name: 'London',
        region: 'City of London, Greater London',
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
    };

    render(<WeatherTool />);


    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  });

  test('navigates back to home when back button is clicked', () => {
    render(<WeatherTool />);


    const backButton = screen.getByText(/Back to Home/i);
    fireEvent.click(backButton);


    expect(dataStore.setCurrentTool).toHaveBeenCalledWith('home');
  });
});
