import { observer } from 'mobx-react-lite';
import dataStore from '../store/DataStore';

const PhoneVerificationTool = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    dataStore.fetchPhoneData();
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">

      <div className="mb-8 flex items-center">
        <button 
          onClick={() => dataStore.setCurrentTool('home')}
          className="mr-4 text-purple-600 hover:text-purple-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Phone Number Verification</h1>
      </div>

      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Include country code (e.g., +1 555 123 4567)"
              value={dataStore.phoneNumber}
              onChange={(e) => dataStore.setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-600"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={dataStore.isLoading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                dataStore.isLoading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {dataStore.isLoading ? 'Loading...' : 'Verify Number'}
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

      
      {dataStore.phoneData && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className={`p-6 text-white ${dataStore.phoneData.valid ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-red-500 to-red-700'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {dataStore.phoneData.international_format}
                </h2>
                <p className={dataStore.phoneData.valid ? 'text-white font-medium' : 'text-white font-medium'}>
                  {dataStore.phoneData.country_name} ({dataStore.phoneData.country_code})
                </p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold px-3 py-1 rounded-full ${dataStore.phoneData.valid ? 'bg-green-600' : 'bg-red-600'}`}>
                  {dataStore.phoneData.valid ? 'Valid' : 'Invalid'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Local Format</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.phoneData.local_format}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">International Format</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.phoneData.international_format}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Country</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.phoneData.country_name} ({dataStore.phoneData.country_code})</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Location</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.phoneData.location || 'Unknown'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Carrier</p>
                <p className="text-xl font-semibold text-gray-900">{dataStore.phoneData.carrier || 'Unknown'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Line Type</p>
                <p className="text-xl font-semibold text-gray-900 capitalize">{dataStore.phoneData.line_type || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {dataStore.phoneHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Searches</h3>
          <div className="space-y-4">
            {dataStore.phoneHistory.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.international_format}</h4>
                    <p className="text-sm text-gray-500">
                      {item.country_name} • {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${item.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.valid ? 'Valid' : 'Invalid'}
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

export default observer(PhoneVerificationTool);
