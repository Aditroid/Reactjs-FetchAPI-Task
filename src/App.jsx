import { observer } from 'mobx-react-lite'
import dataStore from './store/DataStore'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import WeatherTool from './components/WeatherTool'
import PhoneVerificationTool from './components/PhoneVerificationTool'
import CurrencyConverterTool from './components/CurrencyConverterTool'

function App() {
  const renderContent = () => {
    switch (dataStore.currentTool) {
      case 'weather':
        return <WeatherTool />
      case 'phone':
        return <PhoneVerificationTool />
      case 'currency':
        return <CurrencyConverterTool />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-6 px-4">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}

export default observer(App)
