const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">API Tools Hub</h3>
            <p className="text-gray-400 text-sm mt-1">
              Built with React, MobX, and Axios
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-4">
              <a 
                href="https://weatherstack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                WeatherStack API
              </a>
              <a 
                href="https://numverify.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                NumVerify API
              </a>
              <a 
                href="https://fixer.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Fixer API
              </a>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://react.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                React
              </a>
              <a 
                href="https://mobx.js.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                MobX
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Aditya's API Tools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
