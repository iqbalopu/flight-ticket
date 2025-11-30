import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../config/api'
import { format } from 'date-fns'

function FlightDetails() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [flight, setFlight] = useState(null)
  const [loading, setLoading] = useState(true)
  const passengers = parseInt(searchParams.get('passengers')) || 1

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await api.get(`/flights/${id}`)
        setFlight(response.data)
      } catch (error) {
        console.error('Failed to fetch flight:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Flight not found
        </div>
      </div>
    )
  }

  const totalPrice = flight.price * passengers

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Flight Details</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-3xl">✈</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{flight.airline}</h2>
            <p className="text-gray-600">Flight {flight.flightNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
          <div>
            <p className="text-sm text-gray-600 mb-1">Departure</p>
            <p className="text-2xl font-bold">{flight.departureTime}</p>
            <p className="text-lg font-semibold">{flight.origin}</p>
            {flight.date && (
              <p className="text-sm text-gray-600">{format(new Date(flight.date), 'MMM dd, yyyy')}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Duration</p>
            <p className="text-xl font-semibold">{flight.duration}</p>
            <div className="flex items-center justify-center mt-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="mx-2 w-2 h-2 bg-primary-600 rounded-full"></div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Arrival</p>
            <p className="text-2xl font-bold">{flight.arrivalTime}</p>
            <p className="text-lg font-semibold">{flight.destination}</p>
            {flight.date && (
              <p className="text-sm text-gray-600">{format(new Date(flight.date), 'MMM dd, yyyy')}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Available Seats</p>
            <p className="text-lg font-semibold">{flight.availableSeats}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price per Person</p>
            <p className="text-lg font-semibold">${flight.price}</p>
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="text-lg font-semibold">{passengers} {passengers === 1 ? 'passenger' : 'passengers'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-3xl font-bold text-primary-600">${totalPrice}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/booking/${flight.id}?passengers=${passengers}`)}
          className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
        >
          Continue to Booking
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Important Information</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Please arrive at the airport at least 2 hours before departure</li>
          <li>Valid ID or passport required for check-in</li>
          <li>Baggage allowance: 1 carry-on bag (7kg) and 1 checked bag (23kg)</li>
          <li>Changes and cancellations subject to airline policies</li>
        </ul>
      </div>
    </div>
  )
}

export default FlightDetails

