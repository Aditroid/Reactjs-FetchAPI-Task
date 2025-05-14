import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class DataStore {
  currentTool = 'home';
  isLoading = false;
  error = null;

  weatherLocation = '';
  weatherData = null;
  weatherHistory = [];

  phoneNumber = '';
  phoneData = null;
  phoneHistory = [];


  fromCurrency = 'USD';
  toCurrency = 'EUR';
  amount = '1';
  currencyData = null;
  currencyHistory = [];
  availableCurrencies = {

    "USD": "United States Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan",
    "INR": "Indian Rupee",
    "MXN": "Mexican Peso"
  };

  constructor() {
    makeAutoObservable(this);
  }


  setCurrentTool(tool) {
    this.currentTool = tool;
    this.error = null;
  }


  setWeatherLocation(location) {
    this.weatherLocation = location;
  }

  async fetchWeatherData() {
    if (!this.weatherLocation.trim()) {
      this.error = 'Please enter a location';
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {

      const response = await axios.get(`http://api.weatherstack.com/current?access_key=a238b04f09c597972ede7e3df6e0ce34&query=${encodeURIComponent(this.weatherLocation)}`);


      runInAction(() => {
        this.weatherData = response.data;

        if (!this.weatherHistory.some(item => item.location.name === this.weatherLocation)) {
          this.weatherHistory.unshift({
            location: response.data.location,
            current: response.data.current,
            timestamp: new Date()
          });


          if (this.weatherHistory.length > 5) {
            this.weatherHistory.pop();
          }
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Failed to fetch weather data';
        this.isLoading = false;
      });
    }
  }

  clearWeatherData() {
    this.weatherData = null;
    this.weatherLocation = '';
  }


  setPhoneNumber(number) {
    this.phoneNumber = number;
  }

  async fetchPhoneData() {
    if (!this.phoneNumber.trim()) {
      this.error = 'Please enter a phone number';
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {

      const response = await axios.get(`http://apilayer.net/api/validate?access_key=16f348c368d871719384bbb58c7c9e14&number=${encodeURIComponent(this.phoneNumber)}`);

      runInAction(() => {
        this.phoneData = response.data;

        if (!this.phoneHistory.some(item => item.number === this.phoneNumber)) {
          this.phoneHistory.unshift({
            ...response.data,
            timestamp: new Date()
          });


          if (this.phoneHistory.length > 5) {
            this.phoneHistory.pop();
          }
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Failed to verify phone number';
        this.isLoading = false;
      });
    }
  }

  clearPhoneData() {
    this.phoneData = null;
    this.phoneNumber = '';
  }


  setFromCurrency(currency) {
    this.fromCurrency = currency;
  }

  setToCurrency(currency) {
    this.toCurrency = currency;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  async fetchCurrencySymbols() {
    if (Object.keys(this.availableCurrencies).length > 0) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {

      const response = await axios.get(`http://data.fixer.io/api/symbols?access_key=805a3331dc92a2765b3f420a471d46ca`);

      if (response.data.success) {
        runInAction(() => {
          this.availableCurrencies = response.data.symbols;
          this.isLoading = false;
        });
      } else {
        throw new Error(response.data.error?.info || 'Failed to fetch currency symbols');
      }
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Failed to fetch currency symbols';
        this.isLoading = false;
      });
    }
  }

  async fetchCurrencyConversion() {
    if (!this.amount || isNaN(parseFloat(this.amount))) {
      this.error = 'Please enter a valid amount';
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {

      const response = await axios.get(`http://data.fixer.io/api/latest?access_key=805a3331dc92a2765b3f420a471d46ca&symbols=${this.fromCurrency},${this.toCurrency}`);

      if (response.data.success) {

        const amount = parseFloat(this.amount);
        const fromRate = response.data.rates[this.fromCurrency];
        const toRate = response.data.rates[this.toCurrency];


        const valueInEUR = amount / fromRate;
        const result = valueInEUR * toRate;
        const rate = toRate / fromRate;


        const formattedResponse = {
          success: true,
          query: {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: amount
          },
          info: {
            timestamp: response.data.timestamp,
            rate: rate
          },
          result: result
        };

        runInAction(() => {
          this.currencyData = formattedResponse;

          const historyKey = `${this.amount}-${this.fromCurrency}-${this.toCurrency}`;
          if (!this.currencyHistory.some(item => `${item.query.amount}-${item.query.from}-${item.query.to}` === historyKey)) {
            this.currencyHistory.unshift({
              ...formattedResponse,
              timestamp: new Date()
            });


            if (this.currencyHistory.length > 5) {
              this.currencyHistory.pop();
            }
          }
          this.isLoading = false;
        });
      } else {
        throw new Error(response.data.error?.info || 'Failed to convert currency');
      }
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Failed to convert currency';
        this.isLoading = false;
      });
    }
  }

  clearCurrencyData() {
    this.currencyData = null;
    this.amount = '1';
  }
}


const dataStore = new DataStore();
export default dataStore;
