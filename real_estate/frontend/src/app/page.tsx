export default function Home() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Welcome to RentMySpace</h2>
      <p className="text-gray-700 mb-4">Find your ideal real estate space with us.</p>
      <div className="flex space-x-4">
        <a href="/auth/signup" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-center">
          Sign Up
        </a>
        <a href="/auth/login" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-center">
          Login
        </a>
      </div>
    </div>
  );
}
