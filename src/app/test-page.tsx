export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-800">If you see this styled correctly, Tailwind is working!</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          Test Button
        </button>
      </div>
    </div>
  );
}
