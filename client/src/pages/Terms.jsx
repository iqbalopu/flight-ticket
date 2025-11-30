function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using Global Flights website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms & Conditions, please do 
              not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Booking and Payment</h2>
            <p className="text-gray-700 mb-2">
              When you make a booking through our website, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Pay the full amount for your booking</li>
              <li>Accept the airline's terms and conditions</li>
              <li>Comply with all travel requirements and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cancellation and Refunds</h2>
            <p className="text-gray-700">
              Cancellation and refund policies vary by airline and fare type. Please review the specific 
              terms for your booking. Some tickets may be non-refundable or subject to cancellation fees. 
              Refunds, when applicable, will be processed according to the airline's policy and may take 
              7-14 business days to appear in your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Changes to Bookings</h2>
            <p className="text-gray-700">
              Changes to bookings are subject to airline policies and may incur additional fees. Please 
              contact our customer service team or the airline directly to make changes to your booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Travel Documents</h2>
            <p className="text-gray-700">
              It is your responsibility to ensure you have valid travel documents, including passports, 
              visas, and any required health certificates. Global Flights is not responsible for denied 
              boarding due to invalid or missing travel documents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              Global Flights acts as an intermediary between you and the airline. We are not liable for 
              any delays, cancellations, or other issues that may arise from the airline's operations. 
              Our liability is limited to the amount of the booking fee we charge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
            <p className="text-gray-700">
              Your use of our website is also governed by our Privacy Policy. Please review our Privacy 
              Policy to understand our practices regarding your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms & Conditions at any time. Changes will be 
              effective immediately upon posting on our website. Your continued use of our service 
              constitutes acceptance of any changes.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms

