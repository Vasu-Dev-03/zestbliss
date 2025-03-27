export default function OrderSuccess() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. We'll process your order shortly.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </a>
    </div>
  );
} 