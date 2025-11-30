import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookingById, processPayment } from '../services/bookingsService'

function Payment() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    method: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  })

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookingById(bookingId)
        setBooking(bookingData)
      } catch (error) {
        console.error('Failed to fetch booking:', error)
        alert('Booking not found')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      setPaymentDetails({ ...paymentDetails, [name]: formatted })
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5)
      setPaymentDetails({ ...paymentDetails, [name]: formatted })
    } else if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      const formatted = value.replace(/\D/g, '').substring(0, 4)
      setPaymentDetails({ ...paymentDetails, [name]: formatted })
    } else {
      setPaymentDetails({ ...paymentDetails, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      await processPayment(bookingId, paymentDetails)
      navigate(`/confirmation/${bookingId}`)
    } catch (error) {
      alert(error.message || 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }

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
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Flight:</span>
            <span className="font-semibold">
              {booking.flight.origin} → {booking.flight.destination}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers:</span>
            <span className="font-semibold">{booking.passengers.length}</span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600">
              ${booking.totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method *
          </label>
          <select
            name="method"
            value={paymentDetails.method}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {paymentDetails.method === 'card' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name *
              </label>
              <input
                type="text"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Address
          </label>
          <input
            type="text"
            name="billingAddress"
            value={paymentDetails.billingAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a demo application. No actual payment will be processed.
            You can use any test card details to proceed.
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={processing}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {processing ? 'Processing Payment...' : `Pay $${booking.totalAmount}`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Payment

