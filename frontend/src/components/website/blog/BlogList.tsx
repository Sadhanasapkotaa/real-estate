'use client';
import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    subtitle: "Navigating the Real Estate Market: Tips for First-Time Buyers",
    date: "October 23, 2023",
    imageSrc: [
      "/images/real-estate1.jpg",
      "/images/real-estate2.jpg",
      "/images/real-estate3.jpg"
    ],
    image: "https://fncprojectsltd.com/wp-content/uploads/2022/10/gardening.jpg",
    introduction: "Buying a home for the first time can be overwhelming. Understanding the market, financing options, and what to look for in a property can make the process smoother.",
    sections: [
      {
        title: "1. Understanding Market Trends",
        paragraph: "It's crucial to stay informed about market trends, including property values, neighborhood developments, and economic factors that may affect pricing."
      },
      {
        title: "2. Financing Your Purchase",
        paragraph: "Explore various financing options available to you. Understanding your budget and securing pre-approval can give you a competitive edge."
      },
      {
        title: "3. Finding the Right Property",
        paragraph: "Take your time to evaluate properties based on your needs. Consider factors such as location, amenities, and future resale value."
      }
    ],
    conclusion: "With the right preparation and knowledge, first-time buyers can successfully navigate the real estate market and find their dream home.",
    initialLikes: 250,
    initialViews: 1500,
    initialComments: 10
  },
  {
    id: 2,
    subtitle: "Maximizing Your Property's Value: Renovation Tips",
    date: "October 24, 2023",
    imageSrc: [
      "/images/renovation1.jpg",
      "/images/renovation2.jpg",
      "/images/renovation3.jpg"
    ],
    image: "https://fncprojectsltd.com/wp-content/uploads/2022/10/gardening.jpg",
    introduction: "Renovating your property can significantly increase its value. Here are some essential tips to maximize your investment.",
    sections: [
      {
        title: "1. Focus on Curb Appeal",
        paragraph: "Enhancing the exterior of your home can attract potential buyers. Simple upgrades like landscaping, painting, and new fixtures can make a big difference."
      },
      {
        title: "2. Upgrade Key Areas",
        paragraph: "Invest in upgrading kitchens and bathrooms, as these are major selling points. Modern appliances and stylish finishes can yield high returns."
      },
      {
        title: "3. Ensure Quality Workmanship",
        paragraph: "Always hire qualified professionals for renovations. Quality work will not only meet standards but will also add lasting value to your home."
      }
    ],
    conclusion: "Strategic renovations can lead to substantial increases in property value, ensuring a profitable sale in the future.",
    initialLikes: 300,
    initialViews: 2000,
    initialComments: 15
  },
  {
    id: 3,
    subtitle: "Investing in Real Estate: A Beginner's Guide",
    date: "October 25, 2023",
    imageSrc: [
      "/images/investing1.jpg",
      "/images/investing2.jpg",
      "/images/investing3.jpg"
    ],
    image: "https://fncprojectsltd.com/wp-content/uploads/2022/10/gardening.jpg",
    introduction: "Real estate investing can be a lucrative venture. This guide covers essential tips for beginners looking to enter the market.",
    sections: [
      {
        title: "1. Research and Education",
        paragraph: "Start by educating yourself about the real estate market. Understand the different types of investments, including residential, commercial, and rental properties."
      },
      {
        title: "2. Assess Your Financial Situation",
        paragraph: "Evaluate your finances to determine how much you can invest. Consider factors like down payment, mortgage options, and additional costs."
      },
      {
        title: "3. Building a Network",
        paragraph: "Connect with real estate professionals, such as agents, lenders, and fellow investors. A strong network can provide valuable insights and opportunities."
      }
    ],
    conclusion: "By conducting thorough research and networking, beginners can successfully navigate the real estate investment landscape.",
    initialLikes: 150,
    initialViews: 1200,
    initialComments: 8
  }
];

const BlogList = () => {
  const [postStates, setPostStates] = useState(
    blogPosts.map(post => ({
      id: post.id,
      likes: post.initialLikes,
      comments: post.initialComments,
    }))
  );

  const incrementLikes = (id: number) => {
    setPostStates(
      postStates.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const incrementComments = (id: number) => {
    setPostStates(
      postStates.map(post =>
        post.id === id ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => {
          const postState = postStates.find(p => p.id === post.id);
          return (
            <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img src={post.image} alt={post.subtitle} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mt-1">{post.subtitle}</h3>
                <p className="text-gray-700 mt-2">{post.introduction.substring(0, 70) + "..."}</p>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center space-x-4">
                    <button
                      className="flex items-center text-gray-600 hover:text-blue-600"
                      onClick={() => incrementLikes(post.id)}
                    >
                      <span className="mr-1">👍</span> {postState?.likes}
                    </button>
                    <button
                      className="flex items-center text-gray-600 hover:text-blue-600"
                      onClick={() => incrementComments(post.id)}
                    >
                      <span className="mr-1">💬</span> {postState?.comments}
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{post.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogList;
