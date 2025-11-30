function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      
      <div className="prose max-w-none">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Global Flights, we believe that travel should be accessible to everyone. Our mission is to 
            provide a seamless, user-friendly platform that connects travelers with the best flight options 
            at competitive prices.
          </p>
          <p className="text-gray-700">
            We partner with leading airlines worldwide to offer you a comprehensive selection of flights, 
            ensuring you find the perfect journey for your needs and budget.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span><strong>Best Prices:</strong> We compare prices from multiple airlines to ensure you get the best deal.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span><strong>Secure Booking:</strong> Your personal and payment information is protected with industry-leading security.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span><strong>24/7 Support:</strong> Our customer service team is available around the clock to assist you.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span><strong>Easy Booking:</strong> Simple, intuitive interface that makes booking flights quick and easy.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2024, Global Flights was created with a vision to revolutionize the way people book flights. 
            We understand that planning a trip can be overwhelming, which is why we've designed our platform to 
            be as straightforward and user-friendly as possible.
          </p>
          <p className="text-gray-700 mt-4">
            Today, we serve thousands of travelers worldwide, helping them discover new destinations and create 
            unforgettable memories. We're committed to continuously improving our services and expanding our 
            network of airline partners to serve you better.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

