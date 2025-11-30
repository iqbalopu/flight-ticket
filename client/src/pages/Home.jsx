import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlightSearchForm from '../components/FlightSearchForm'

function Home() {
  const navigate = useNavigate()

  const handleSearch = (searchData) => {
    const params = new URLSearchParams({
      origin: searchData.origin,
      destination: searchData.destination,
      date: searchData.date,
      passengers: searchData.passengers
    })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Dream Flight
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Find the best deals on flights worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <FlightSearchForm onSearch={handleSearch} />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
            <p className="text-gray-600">Your data and payments are protected with industry-leading security.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">We compare prices from multiple airlines to get you the best deals.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✈️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our customer support team is available around the clock to help you.</p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['London', 'Paris', 'Tokyo', 'New York', 'Dubai', 'Singapore', 'Sydney', 'Rome', 'Barcelona', 'Amsterdam', 'Berlin', 'Istanbul'].map((city) => (
              <div 
                key={city}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer transform hover:scale-105"
                onClick={() => navigate(`/search?destination=${city}`)}
              >
                <div className="text-4xl mb-2">✈️</div>
                <h3 className="font-semibold">{city}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

