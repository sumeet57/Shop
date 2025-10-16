import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [countdown, setCountdown] = React.useState(5);
  const [orderId, setOrderId] = React.useState(params.orderId || null);

  useEffect(() => {
    console.log(orderId);
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="bg-zinc-900 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16 text-green-500 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M8 12l2.5 2.5L16 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
          {orderId && (
            <p className="text-zinc-300 text-sm">
              Your order{" "}
              <span className="font-semibold text-green-400">#{orderId}</span>{" "}
              has been placed.
            </p>
          )}
          <p className="text-zinc-400 text-xs">
            Redirecting to dashboard in {countdown} seconds...
          </p>
          <button
            onClick={() => navigate("/shop/dashboard")}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
