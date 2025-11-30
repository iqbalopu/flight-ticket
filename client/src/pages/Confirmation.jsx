import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBookingById } from '../services/bookingsService'
import { format } from 'date-fns'

function Confirmation() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookingById(bookingId)
        setBooking(bookingData)
      } catch (error) {
        console.error('Failed to fetch booking:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Booking not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your flight has been successfully booked</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="font-semibold">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-green-600 capitalize">{booking.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Booking Date</p>
              <p className="font-semibold">
                {booking.createdAt 
                  ? format(booking.createdAt.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt), 'MMM dd, yyyy HH:mm')
                  : 'N/A'}
              </p>
            </div>
            {booking.paymentDetails && (
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-semibold">{booking.paymentDetails.transactionId}</p>
                {booking.paymentDetails.paidAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Paid: {format(booking.paymentDetails.paidAt.toDate ? booking.paymentDetails.paidAt.toDate() : new Date(booking.paymentDetails.paidAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Flight Information</h2>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">✈</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{booking.flight.airline}</h3>
              <p className="text-sm text-gray-600">Flight {booking.flight.flightNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Departure</p>
              <p className="font-semibold">{booking.flight.departureTime}</p>
              <p className="text-sm text-gray-600">{booking.flight.origin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{booking.flight.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Arrival</p>
              <p className="font-semibold">{booking.flight.arrivalTime}</p>
              <p className="text-sm text-gray-600">{booking.flight.destination}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Passengers</h2>
          <div className="space-y-3">
            {booking.passengers.map((passenger, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold">
                  {passenger.firstName} {passenger.lastName}
                </p>
                <p className="text-sm text-gray-600">{passenger.email}</p>
                <p className="text-sm text-gray-600">{passenger.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Paid</span>
              <span className="text-3xl font-bold text-primary-600">
                ${booking.totalAmount}
              </span>
            </div>
            {booking.paymentDetails && (
              <p className="text-sm text-gray-600 mt-2">
                Payment Method: {booking.paymentDetails.method.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">What's Next?</h3>
        <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
          <li>You will receive a confirmation email at {booking.contactInfo.email}</li>
          <li>Please arrive at the airport at least 2 hours before departure</li>
          <li>Bring a valid ID or passport for check-in</li>
          <li>Check your email for your e-ticket</li>
        </ul>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
        >
          Book Another Flight
        </Link>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Print Confirmation
        </button>
      </div>
    </div>
  )
}

export default Confirmation

