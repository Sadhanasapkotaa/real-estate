import React from 'react';

function Contact() {
    return (
        <div className="flex flex-col md:flex-row p-6 bg-gray-50">
            {/* Map Section */}
            <div className="flex-1 mb-6 md:mb-0 md:mr-6">
                <iframe
                    className="w-full h-64 md:h-full rounded-xl shadow-lg transition-transform transform "
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Place+Name,City+Name"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Form Section */}
            <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Message</label>
                        <textarea
                            name="message"
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-md text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;