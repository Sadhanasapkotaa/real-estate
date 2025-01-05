'use client';
import { useState } from "react";

const FAQForm = () => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row m-10">
        {/* Left side */}
        <div className="w-full md:w-2/5 bg-blue-600 text-white p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
              <div className="m-10">
                  <h1 className="text-5xl font-bold mb-4">There might be questions for you to answer!</h1>
                  <br />
                  <br />
                  
          <p className="mb-8">
            Let's answer all the frequently asked questions before they are even asked. They are about your product. Let's goo!!
          </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-3/5 p-8 rounded-b-lg md:rounded-r-lg md:m-10 md:rounded-bl-none">
          <h2 className="text-xl font-semibold mb-6">Let's answer questions:</h2>

          <form>
            
            {/* Password */}
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Enter your FAQ Question:
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={form.question}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-2"  
              />
                  </div>

            <div className="mb-4">
  <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
    Enter your FAQ Answer:
  </label>
  <textarea
    id="answer"
    name="answer"
    value={form.answer}
    onChange={handleInputChange}
    rows={5}  // Adjust the height
    className="mt-1 p-2 w-full h-40 border border-gray-300 rounded-lg mb-2"  // Set height using Tailwind CSS
  />
</div>

            {/* Submit Button */}
            <button
  type="submit"
  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition-colors"
>
  Get Started
</button>
          </form>
        </div>
      </div>
      );
};

export default FAQForm;
