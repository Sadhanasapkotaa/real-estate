'use client'
import { useState } from 'react';

const faqData = [
  {
    question: "What is RealEstate?",
    answer: "RealEstate is an online platform that connects buyers, sellers, and renters with real estate properties in their area."
  },
  {
    question: "How do I list my property?",
    answer: "You can list your property by creating an account on our website and following the listing instructions."
  },
  {
    question: "Is there a fee to use the platform?",
    answer: "No, it’s completely free to browse listings. However, there may be fees associated with listing your property."
  },
  {
    question: "How can I contact support?",
    answer: "You can contact our support team via the Help Center or by clicking the 'Live Chat' option."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div>
          {faqData.map((faq, index) => (
            <div key={index} className={`bg-white overflow-hidden `}>
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none border-b border-gray-100 transition"
              >
                <span className="text-lg font-medium text-gray-800 ">{faq.question}</span>
                <span className="ml-2 text-gray-600 ">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-b border-blue-700">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
