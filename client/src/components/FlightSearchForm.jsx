import { useState, useEffect, useRef } from 'react'
import { cities } from '../data/cities'

function FlightSearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  })

  const [showOriginDropdown, setShowOriginDropdown] = useState(false)
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false)
  const [filteredOriginCities, setFilteredOriginCities] = useState(cities)
  const [filteredDestinationCities, setFilteredDestinationCities] = useState(cities)
  const originRef = useRef(null)
  const destinationRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginDropdown(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.origin && formData.destination && formData.date) {
      onSearch(formData)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // Filter cities based on input
    if (e.target.name === 'origin') {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredOriginCities(filtered)
      setShowOriginDropdown(true)
    } else if (e.target.name === 'destination') {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredDestinationCities(filtered)
      setShowDestinationDropdown(true)
    }
  }

  const selectCity = (city, field) => {
    setFormData({
      ...formData,
      [field]: city
    })
    if (field === 'origin') {
      setShowOriginDropdown(false)
    } else {
      setShowDestinationDropdown(false)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Get dates for the next 30 days
  const getAvailableDates = () => {
    const dates = []
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })
      })
    }
    return dates
  }

  const availableDates = getAvailableDates()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative" ref={originRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            onFocus={() => setShowOriginDropdown(true)}
            placeholder="Select origin city"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          {showOriginDropdown && filteredOriginCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredOriginCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city, 'origin')}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 hover:text-primary-600 transition"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative" ref={destinationRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            onFocus={() => setShowDestinationDropdown(true)}
            placeholder="Select destination city"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          {showDestinationDropdown && filteredDestinationCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredDestinationCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city, 'destination')}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 hover:text-primary-600 transition"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure Date
          </label>
          <select
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select date</option>
            {availableDates.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <select
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Passenger' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
      >
        Search Flights
      </button>
    </form>
  )
}

export default FlightSearchForm

