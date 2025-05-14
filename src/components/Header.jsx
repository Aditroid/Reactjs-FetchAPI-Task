import { observer } from 'mobx-react-lite';
import dataStore from '../store/DataStore';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div
              onClick={() => dataStore.setCurrentTool('home')}
              className="flex items-center cursor-pointer"
            >
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="text-2xl md:text-3xl font-bold">API Tools Hub</h1>
            </div>
          </div>

          <div className="flex space-x-2 flex-wrap">
            <button
              onClick={() => dataStore.setCurrentTool('home')}
              className={`px-4 py-2 rounded-md transition-colors ${dataStore.currentTool === 'home'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-700 hover:bg-blue-800'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => dataStore.setCurrentTool('weather')}
              className={`px-4 py-2 rounded-md transition-colors ${dataStore.currentTool === 'weather'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-700 hover:bg-blue-800'
                }`}
            >
              Weather
            </button>
            <button
              onClick={() => dataStore.setCurrentTool('phone')}
              className={`px-4 py-2 rounded-md transition-colors ${dataStore.currentTool === 'phone'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-700 hover:bg-blue-800'
                }`}
            >
              Phone Verify
            </button>
            <button
              onClick={() => dataStore.setCurrentTool('currency')}
              className={`px-4 py-2 rounded-md transition-colors ${dataStore.currentTool === 'currency'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-700 hover:bg-blue-800'
                }`}
            >
              Currency
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
