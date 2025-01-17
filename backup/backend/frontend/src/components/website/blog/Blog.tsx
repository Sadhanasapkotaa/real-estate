'use client'; 
import { useState } from "react";

const Blog = () => {   
  const blogPosts = [     
    {       
      id: 1,       
      title: "Navigating the Real Estate Market: Tips for First-Time Buyers",       
      subtitle: "Tips for First-Time Buyers",       
      date: "October 23, 2023",       
      imageSrc: [         
        "/images/real-estate1.jpg",         
        "/images/real-estate2.jpg",         
        "/images/real-estate3.jpg"       
      ],       
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
    // Additional blog posts...   
  ];    

  // Set the selected post ID to state
  const [selectedPostId] = useState(blogPosts[0].id);   
  const blogData = blogPosts.find(post => post.id === selectedPostId);    

  return (     
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">       
      {blogData && (         
        <>
          {/* Tagline */}         
          <div className="flex justify-between items-center mb-4">           
            <span className="bg-green-300 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">             
              Popular Article           
            </span>           
            <p className="text-gray-600 text-sm">{blogData.date}</p>         
          </div>          

          {/* Title */}         
          <h1 className="text-4xl font-bold text-gray-900 mb-4">           
            {blogData.title}         
          </h1>          

          {/* Subtitle */}         
          <p className="text-gray-700 text-lg italic mb-6">           
            {blogData.subtitle}         
          </p>          

          {/* First Image */}         
          {blogData.imageSrc[0] && (           
            <div className="grid gap-6 mb-8">             
              <img               
                src={blogData.imageSrc[0]}               
                alt={`Blog visual`}               
                className="w-full h-72 object-cover rounded-lg shadow-md"             
              />           
            </div>         
          )}          

          {/* Main content */}         
          <div className="space-y-8 text-gray-700">           
            {/* Introduction */}           
            <p className="text-lg">             
              {blogData.introduction}           
            </p>            

            {/* Second Image */}           
            {blogData.imageSrc[1] && (             
              <div className="grid gap-6 mb-8">               
                <img                 
                  src={blogData.imageSrc[1]}                 
                  alt={`Blog visual`}                 
                  className="w-full h-72 object-cover rounded-lg shadow-md"               
                />             
              </div>           
            )}            

            {/* Dynamic Subheadings and Paragraphs */}           
            {blogData.sections.map((section, index) => (             
              <div key={index}>               
                <h2 className="text-2xl font-semibold mt-6 text-gray-900">                 
                  {section.title}               
                </h2>               

                {/* Optional Image for Each Section */}               
                {index === 2 && blogData.imageSrc[2] && ( // Display the third image only for the last section
                  <div className="grid gap-6 mb-8">                   
                    <img                     
                      src={blogData.imageSrc[2]}                     
                      alt={`Blog visual`}                     
                      className="w-full h-72 object-cover rounded-lg shadow-md"                   
                    />                 
                  </div>               
                )}               

                <p className="text-lg mt-2">                 
                  {section.paragraph}               
                </p>             
              </div>           
            ))}           

            {/* Conclusion */}           
            <p className="font-semibold text-lg mt-6">             
              {blogData.conclusion}           
            </p>         
          </div>       
        </>     
      )}   
    </div> 
  ); 
};  

export default Blog; 
