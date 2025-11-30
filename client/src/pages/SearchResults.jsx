import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../config/api'
import { format } from 'date-fns'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const origin = searchParams.get('origin') || ''
  const destination = searchParams.get('destination') || ''
  const date = searchParams.get('date') || ''
  const passengers = searchParams.get('passengers') || '1'

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (origin) params.append('origin', origin)
        if (destination) params.append('destination', destination)
        if (date) params.append('date', date)

        const response = await api.get(`/flights?${params.toString()}`)
        setFlights(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch flights. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [origin, destination, date])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Searching for flights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600">
          {origin && destination && (
            <>
              Flights from <strong>{origin}</strong> to <strong>{destination}</strong>
              {date && ` on ${format(new Date(date), 'MMMM dd, yyyy')}`}
            </>
          )}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {flights.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-2xl font-semibold mb-2">No flights found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any flights matching your search criteria. Try adjusting your search.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Search Again
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">✈</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{flight.airline}</h3>
                      <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Departure</p>
                      <p className="font-semibold">{flight.departureTime}</p>
                      <p className="text-sm text-gray-600">{flight.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{flight.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Arrival</p>
                      <p className="font-semibold">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-600">{flight.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Seats</p>
                      <p className="font-semibold">{flight.availableSeats}</p>
                    </div>
                  </div>
                </div>

                <div className="md:ml-6 md:text-right mt-4 md:mt-0">
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary-600">
                      ${flight.price}
                    </p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                  <Link
                    to={`/flight/${flight.id}?passengers=${passengers}`}
                    className="block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition text-center"
                  >
                    Select Flight
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults

