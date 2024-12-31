import React from 'react';

const legalData = [
    {
        "question": "Terms of Service",
        "answer": "By accessing this website, you agree to be bound by these terms of service and all applicable laws and regulations."
    },
    {
        "question": "Privacy Policy",
        "answer": "We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your information."
    },
    {
        "question": "Disclaimer",
        "answer": "The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind."
    },
    {
        "question": "Contact Us",
        "answer": "If you have any questions about these legalities, please contact us at legal@realestate.com."
    }
];

function Legal() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Information</h1>
                    <p className="text-gray-600 mb-6">
                        Welcome to our real estate website. Please read the following legal information carefully.
                    </p>

                    <div className="space-y-4">
                        {legalData.map((item, index) => (
                            <details key={index} className="group relative">
                                <summary className="text-xl font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                                    {item.question}
                                    <span className="transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-open:max-h-40 absolute left-0 right-0 bg-white p-4 shadow-lg z-10 border-l border-blue-700">
                                    <p className="text-gray-600 mt-2">
                                        {item.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 hidden lg:block mt-20">
                <img
                    src="https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww"
                    alt="Legal"
                    className="w-96 h-96 object-cover"
                />
            </div>
        </div>
    );
}

export default Legal;
