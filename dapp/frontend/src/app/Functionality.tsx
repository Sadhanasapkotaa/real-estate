import React from "react";

const Functionality = () => {
  return (
    <section className="py-20 bg-white">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Developed from scratch for seamless online functionality
        </h2>
        <p className="text-base text-gray-600 mb-8">
          Using technology to make finance simpler, smarter, and more rewarding.
        </p>
        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
            Get started
          </button>
          <button className="border border-gray-300 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 hover:text-white transition duration-300">
            Learn more
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex max-w-6xl gap-6 mx-auto px-8">
        {/* Card 1 */}
        <div className="bg-gray-900 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg w-2/4">
          <div>
            <div className="text-xl font-bold mb-4">
              Accomplish tasks swiftly with online tools.
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Get quoted and covered in under 10 minutes online, no account or existing app required.
            </p>
          </div>
          <button className="border border-white text-white px-4 py-2 rounded-full self-start mt-auto hover:bg-white hover:text-gray-900 transition duration-300">
            View More
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-indigo-600 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg w-1/4 ">
          <div>
            <div className="text-lg font-bold mb-3">
              Improved technology yields greater value
            </div>
            <p className="text-sm text-gray-200 mb-3">
              We eliminated old analog systems with the latest tech for smarter management.
            </p>
          </div>
          <button className="border border-white text-white px-3 py-1 rounded-full self-start mt-auto hover:bg-white hover:text-indigo-600 transition duration-300">
            View More
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-purple-600 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg w-1/4 ">
          <div>
            <div className="text-lg font-bold mb-3">
              Build wealth with insurance planning
            </div>
            <p className="text-sm text-gray-200 mb-3">
              Every life policy has a built-in wealth bonus — no extra costs or contributions needed.
            </p>
          </div>
          <button className="border border-white text-white px-3 py-1 rounded-full self-start mt-auto hover:bg-white hover:text-purple-600 transition duration-300">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Functionality;
