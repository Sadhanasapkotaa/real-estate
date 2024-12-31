'use client';
import { useState } from "react";

const WriteBlog = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle the form submission logic (e.g., API call)
    console.log('Form submitted:', form);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row m-10">
      {/* Left side */}
      <div className="w-full md:w-2/5 bg-indigo-600 text-white p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
        <div className="m-10">
          <h1 className="text-4xl font-bold mb-4">Start Writing Your Blog!</h1>
          <p className="mb-8">
            Share your thoughts and insights with the world. Fill out the form to create a new blog post.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-3/5 p-8 rounded-b-lg md:rounded-r-lg md:m-10 md:rounded-bl-none">
        <h2 className="text-xl font-semibold mb-6">Blog Post Details:</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Blog Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-2"
              placeholder="Enter your blog title"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
              Blog Subtitle:
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={form.subtitle}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-2"
              placeholder="Enter your blog subtitle"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Blog Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleInputChange}
              rows={6} // Adjust the height for content
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-2"
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-indigo-700 transition-colors"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
