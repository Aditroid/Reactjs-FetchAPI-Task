import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import dataStore from '../store/DataStore';

const CurrencyConverterTool = () => {
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    
    dataStore.error = null;
    
    try {
      dataStore.fetchCurrencySymbols();
    } catch (error) {
      
      console.log('Using default currencies');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dataStore.fetchCurrencyConversion();
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => dataStore.setCurrentTool('home')}
          className="mr-4 text-green-600 hover:text-green-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Currency Converter</h1>
      </div>

      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                placeholder="Enter amount"
                value={dataStore.amount}
                onChange={(e) => dataStore.setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-600"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                From Currency
              </label>
              <select
                id="fromCurrency"
                value={dataStore.fromCurrency}
                onChange={(e) => dataStore.setFromCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                required
              >
                {Object.keys(dataStore.availableCurrencies).length > 0 ? (
                  Object.entries(dataStore.availableCurrencies).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))
                ) : (
                  <option value="USD">USD - US Dollar</option>
                )}
              </select>
            </div>
            
            <div>
              <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                To Currency
              </label>
              <select
                id="toCurrency"
                value={dataStore.toCurrency}
                onChange={(e) => dataStore.setToCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                required
              >
                {Object.keys(dataStore.availableCurrencies).length > 0 ? (
                  Object.entries(dataStore.availableCurrencies).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))
                ) : (
                  <option value="EUR">EUR - Euro</option>
                )}
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={dataStore.isLoading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                dataStore.isLoading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {dataStore.isLoading ? 'Converting...' : 'Convert'}
            </button>
          </div>
        </form>
      </div>

      
      {showError && dataStore.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{dataStore.error}</span>
          </div>
        </div>
      )}

      
      {dataStore.currencyData && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-1">
                  {parseFloat(dataStore.amount).toLocaleString()} {dataStore.fromCurrency}
                </h2>
                <p className="text-white font-medium">
                  to {dataStore.toCurrency}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {dataStore.currencyData.result.toLocaleString()} {dataStore.toCurrency}
                </div>
                <p className="text-sm text-white mt-1">
                  Rate: 1 {dataStore.fromCurrency} = {dataStore.currencyData.info.rate} {dataStore.toCurrency}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Date</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Date(dataStore.currencyData.info.timestamp * 1000).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Time</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Date(dataStore.currencyData.info.timestamp * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {dataStore.currencyHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Conversions</h3>
          <div className="space-y-4">
            {dataStore.currencyHistory.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {parseFloat(item.query.amount).toLocaleString()} {item.query.from} to {item.query.to}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{item.result.toLocaleString()} {item.query.to}</p>
                    <p className="text-sm text-gray-600">Rate: {item.info.rate}</p>
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

export default observer(CurrencyConverterTool);
