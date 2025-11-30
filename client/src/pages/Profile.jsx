import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserData, updateProfile, updateUserData, getAuthErrorMessage } from '../services/authService'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { format } from 'date-fns'

function Profile() {
  const navigate = useNavigate()
  const { user, userData, isAuthenticated } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Load user data
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || user?.email || ''
      })
      setLoading(false)
    }

    // Load user bookings
    loadBookings()
  }, [isAuthenticated, user, userData, navigate])

  const loadBookings = async () => {
    if (!user) return

    try {
      const bookingsRef = collection(db, 'bookings')
      // Try to query by email, if it fails, get all and filter client-side
      try {
        const q = query(
          bookingsRef,
          where('contactInfo.email', '==', user.email),
          orderBy('createdAt', 'desc')
        )
        const snapshot = await getDocs(q)
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setBookings(bookingsData)
      } catch (queryError) {
        // If query fails (e.g., no index), get all and filter
        console.warn('Query failed, filtering client-side:', queryError)
        const snapshot = await getDocs(bookingsRef)
        const allBookings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const filteredBookings = allBookings
          .filter(booking => booking.contactInfo?.email === user.email)
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0)
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0)
            return dateB - dateA
          })
        setBookings(filteredBookings)
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setBookingsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      })

      // Update Firestore user data
      await updateUserData(user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: `${formData.firstName} ${formData.lastName}`
      })

      setSuccess('Profile updated successfully!')
      setEditing(false)
      // Reload page to refresh user data
      window.location.reload()
    } catch (err) {
      setError(getAuthErrorMessage(err) || 'Failed to update profile')
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Profile Information */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  setError('')
                  setSuccess('')
                  setFormData({
                    firstName: userData?.firstName || '',
                    lastName: userData?.lastName || '',
                    email: userData?.email || user?.email || ''
                  })
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="text-lg font-semibold">{userData?.firstName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="text-lg font-semibold">{userData?.lastName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold">{userData?.email || user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-semibold">
                  {userData?.createdAt 
                    ? format(new Date(userData.createdAt), 'MMMM dd, yyyy')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking History */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Booking History</h2>

        {bookingsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Search Flights
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status?.toUpperCase() || 'PENDING'}
                      </span>
                      <span className="ml-4 text-sm text-gray-600">
                        Booking ID: {booking.id.substring(0, 8)}...
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {booking.flight?.origin} → {booking.flight?.destination}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Flight</p>
                        <p className="font-semibold">
                          {booking.flight?.airline} {booking.flight?.flightNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-semibold">
                          {booking.flight?.date 
                            ? format(new Date(booking.flight.date), 'MMM dd, yyyy')
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Passengers</p>
                        <p className="font-semibold">{booking.passengers?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total</p>
                        <p className="font-semibold text-primary-600">
                          ${booking.totalAmount || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button
                      onClick={() => navigate(`/confirmation/${booking.id}`)}
                      className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

