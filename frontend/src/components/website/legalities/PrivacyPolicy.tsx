import React from 'react';

const privacyPolicyData = [
    {
        question: "1. Introduction",
        answer: "At Koala Studio, we value your privacy and are committed to protecting your personal information..."
    },
    {
        question: "2. Information We Collect",
        answer: "Personal Data, Non-Personal Data"
    },
    {
        question: "3. How We Use Your Information",
        answer: "We use your information to provide, maintain, and improve our services..."
    },
    {
        question: "4. Sharing Your Information",
        answer: "We do not share your personal information with third parties except as necessary..."
    }
];

function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-blue-50">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">Privacy Policy</h1>
                    <p className="text-blue-600 mb-6">
                        Please read the following privacy policy carefully.
                    </p>

                    <div className="space-y-4">
                        {privacyPolicyData.map((item, index) => (
                            <details key={index} className="group relative">
                                <summary className="text-xl font-semibold text-blue-800 cursor-pointer flex justify-between items-center">
                                    {item.question}
                                    <span className="transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-open:max-h-40 absolute left-0 right-0 bg-white p-4 shadow-lg z-10 border-l border-blue-700">
                                    <p className="text-blue-700 mt-2">
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
                    alt="Privacy"
                    className="w-96 h-96 object-cover"
                />
            </div>
        </div>
    );
}

export default PrivacyPolicy;