# API Tools Hub

## Project Overview

API Tools Hub is a modern web application that provides users with a collection of useful tools powered by external APIs. The application is built using React, MobX for state management, and integrates with multiple third-party APIs to deliver real-time data and functionality.

## Features

- **Weather Lookup Tool**: Get real-time weather information for any location using the WeatherStack API
- **Phone Verification Tool**: Verify phone numbers and get detailed information using the NumVerify API
- **Currency Converter Tool**: Convert between different currencies using real-time exchange rates with the Fixer API
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **History Tracking**: Each tool maintains a history of recent searches for quick reference

## Project Structure

```
fetchapi/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets (images, etc.)
│   ├── components/      # React components
│   │   ├── Header.jsx   # Application header with navigation
│   │   ├── Footer.jsx   # Application footer
│   │   ├── HomePage.jsx # Landing page with tool cards
│   │   ├── WeatherTool.jsx       # Weather lookup tool
│   │   ├── PhoneVerificationTool.jsx # Phone verification tool
│   │   ├── CurrencyConverterTool.jsx # Currency converter tool
│   │   └── ... (other UI components)
│   ├── store/           # MobX state management
│   │   └── DataStore.js # Central data store for application state
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## Component Overview

### Core Components

#### App.jsx
The main application component that handles routing between different tools using MobX state. It renders the appropriate tool component based on the current selection in the data store.

#### Header.jsx
Contains the application header with navigation links and branding. Allows users to navigate between different tools.

#### Footer.jsx
Contains the application footer with links and copyright information.

#### HomePage.jsx
The landing page that displays cards for each available tool. Each card provides a brief description of the tool and allows users to navigate to it.

### Tool Components

#### WeatherTool.jsx
Allows users to search for weather information by location. Integrates with the WeatherStack API to fetch real-time weather data. Displays current conditions including temperature, humidity, wind speed, and more.

#### PhoneVerificationTool.jsx
Provides phone number verification functionality. Uses the NumVerify API to validate phone numbers and display detailed information about them, including country, carrier, and line type.

#### CurrencyConverterTool.jsx
Enables currency conversion between different currencies. Integrates with the Fixer API to fetch real-time exchange rates and perform conversions.

### Utility Components

- **LoadingSpinner.jsx**: Displays a loading animation during API requests
- **ErrorMessage.jsx**: Shows error messages when API requests fail
- **DataDisplay.jsx**: Reusable component for displaying data in a structured format
- **Pagination.jsx**: Handles pagination for lists of data

## State Management with MobX

The application uses MobX for state management, with a central data store (`DataStore.js`) that manages all application state.

### Key MobX Features Used

- **Observable State**: All application state is made observable using `makeAutoObservable`
- **Actions**: State modifications are encapsulated in actions
- **Computed Values**: Derived state is calculated using computed properties
- **Reactions**: Side effects are managed using reactions
- **Asynchronous Actions**: API calls are handled using async/await with `runInAction`

### MobX Code Example

```javascript
// Creating observable state
import { makeAutoObservable, runInAction } from 'mobx';

class DataStore {
  // Observable state
  currentTool = 'home';
  isLoading = false;
  error = null;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  // Action to update state
  setCurrentTool(tool) {
    this.currentTool = tool;
    this.error = null;
  }
  
  // Async action with API call
  async fetchWeatherData() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await axios.get(`http://api.weatherstack.com/current?access_key=API_KEY&query=${this.weatherLocation}`);
      
      // Update state with runInAction after async operation
      runInAction(() => {
        this.weatherData = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.isLoading = false;
      });
    }
  }
}
```

## API Integration

The application integrates with multiple external APIs to provide its functionality:

### Axios for API Requests

All API requests are made using Axios, a popular HTTP client for JavaScript. Axios provides a simple and consistent API for making HTTP requests and handling responses.

```javascript
import axios from 'axios';

// Example API request
const response = await axios.get(`http://api.weatherstack.com/current?access_key=API_KEY&query=${location}`);
```

### WeatherStack API

Used by the Weather Lookup tool to fetch real-time weather data for locations worldwide. The API provides current weather conditions, including temperature, humidity, wind speed, and more.

### NumVerify API

Used by the Phone Verification tool to validate phone numbers and fetch detailed information about them. The API provides information such as country, carrier, line type, and validity.

### Fixer API

Used by the Currency Converter tool to fetch real-time exchange rates and perform currency conversions. The API provides access to exchange rates for over 170 currencies.

## Developer Experience

As the developer of this project, I focused on creating a clean, maintainable codebase with a simple yet attractive UI. The project was built with the following considerations:

### Theme and Design

I chose a simple, clean theme that focuses on usability and readability. The UI uses a light color scheme with accent colors for different tools, making it easy for users to distinguish between them. The design is minimalist but functional, putting the focus on the data and functionality rather than flashy visuals.

### Scalability

The project is designed to be easily scalable:
- **Modular Architecture**: Each tool is a separate component that can be developed and tested independently
- **Centralized State Management**: Using MobX makes it easy to add new state and actions as needed
- **Reusable Components**: Common UI elements are abstracted into reusable components
- **API Abstraction**: API calls are centralized in the data store, making it easy to add new APIs or change existing ones

### Future Improvements

With more time, I would like to implement:
- Additional API tools (e.g., translation services, image recognition)
- User accounts and saved preferences
- Offline support with service workers
- More comprehensive error handling and retry mechanisms
- Advanced data visualization for API responses

### Time Constraints

This project was developed within a tight timeframe due to other concurrent projects. Despite these constraints, I prioritized:
- Core functionality over bells and whistles
- Clean code over quick hacks
- User experience over developer convenience
- Proper state management over quick solutions

### Efficiency

The project demonstrates efficient use of:
- React's component model for UI composition
- MobX for predictable state management
- Axios for streamlined API requests
- Modern JavaScript features (async/await, destructuring, etc.)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/api-tools-hub.git

# Navigate to the project directory
cd api-tools-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (for development)
npm run test:watch
```

## Testing

The project includes unit tests for critical components and functionality using Jest and React Testing Library. The tests cover:

- Component rendering
- User interactions
- API integration
- State management with MobX

### Test Structure

```
src/
└── __tests__/           # Test files
    ├── WeatherTool.test.jsx    # Tests for the Weather Tool component
    └── DataStore.test.js       # Tests for the MobX data store
```

### Testing Approach

- **Component Tests**: Verify that components render correctly and respond to user interactions
- **Store Tests**: Verify that the MobX store correctly manages state and handles API calls
- **Mock Testing**: API calls are mocked to test success and error scenarios without making actual network requests

## Technologies Used

- **React**: UI library
- **MobX**: State management
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **ESLint**: Code linting
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components

## License

This project is licensed under the MIT License - see the LICENSE file for details.
