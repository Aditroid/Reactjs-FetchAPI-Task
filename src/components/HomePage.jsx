import { observer } from 'mobx-react-lite';
import dataStore from '../store/DataStore';

const HomePage = () => {
  return (
    <div className="fade-in">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to My API Tools Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of useful API-powered tools built with React and MobX
          </p>
        </div>

        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-700 mb-4">
            Hello! I'm Aditya Bora, a passionate MERN developer who loves building useful web applications. 
            This project showcases my skills in React, MobX state management, and API integration.
          </p>
          <p className="text-gray-700 mb-4">
            I created this hub to demonstrate how to build a modern web application that interacts 
            with external APIs. The tools below are just the beginning - I plan to add more in the future!
          </p>
          <p className="text-gray-700 mb-4">
            Feel free to explore the different tools and see what they can do. Each tool demonstrates 
            different aspects of web development, from form handling to data visualization.
          </p>
          <p className="text-gray-700">
            Do let me know if you have any questions or suggestions for new tools to add! Also go through the <b>README.md</b> and <b>PRODUCT_REQUIREMENT.md</b> file for more information. I have made similar project which fetches news from <b>NewsAPI</b> and displays it. You can find it <a href="https://github.com/Aditroid/News" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800">here</a>.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <div 
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => dataStore.setCurrentTool('weather')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Weather Lookup</h3>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="mb-4">Get current weather information for any location in the world using the WeatherStack API.</p>
              <div className="flex items-center text-sm">
                <span className="bg-blue-600 px-2 py-1 rounded mr-2">Weather</span>
                <span className="bg-blue-600 px-2 py-1 rounded mr-2">Location</span>
                <span className="bg-blue-600 px-2 py-1 rounded">API</span>
              </div>
            </div>
            <div className="bg-blue-800 px-6 py-3">
              <span className="font-medium">Try it now →</span>
            </div>
          </div>

          
          <div 
            className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => dataStore.setCurrentTool('phone')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Verify Number</h3>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="mb-4">Verify phone numbers and get detailed information using the NumVerify API.</p>
              <div className="flex items-center text-sm">
                <span className="bg-purple-600 px-2 py-1 rounded mr-2">Phone</span>
                <span className="bg-purple-600 px-2 py-1 rounded mr-2">Verification</span>
                <span className="bg-purple-600 px-2 py-1 rounded">API</span>
              </div>
            </div>
            <div className="bg-purple-800 px-6 py-3">
              <span className="font-medium">Try it now →</span>
            </div>
          </div>


          <div 
            className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => dataStore.setCurrentTool('currency')}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Currency Converter</h3>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mb-4">Convert between different currencies using real-time exchange rates with the Fixer API.</p>
              <div className="flex items-center text-sm">
                <span className="bg-green-600 px-2 py-1 rounded mr-2">Currency</span>
                <span className="bg-green-600 px-2 py-1 rounded mr-2">Exchange</span>
                <span className="bg-green-600 px-2 py-1 rounded">API</span>
              </div>
            </div>
            <div className="bg-green-800 px-6 py-3">
              <span className="font-medium">Try it now →</span>
            </div>
          </div>
        </div>

        
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">More Tools Coming Soon!</h3>
          <p className="text-gray-600">
            I'm constantly working on adding new tools to this collection. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default observer(HomePage);
