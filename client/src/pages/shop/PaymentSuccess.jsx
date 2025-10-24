import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [countdown, setCountdown] = React.useState(5);

  // Destructure with a fallback to ensure location.state exists
  const amount = location.state?.amount;
  const orderId = location.state?.OrderId;

  // Determine if the necessary data is present
  const paymentDataValid = !!orderId && !!amount;

  useEffect(() => {
    if (paymentDataValid) {
      console.log(
        "Payment successful for Order ID:",
        orderId,
        "Amount:",
        amount
      );

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/project");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      console.error("Missing order ID or amount in payment success data.");
    }
  }, [paymentDataValid, orderId, amount, navigate]);

  if (!paymentDataValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-4">
            <svg
              className="w-16 h-16 text-red-500 mb-2"
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
                d="M15 9l-6 6M9 9l6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white">Data Missing!</h2>
            <p className="text-zinc-400 text-sm">
              Payment details are missing. Please check your order history.
            </p>
            <button
              onClick={() => navigate("/transactions")}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Go to Transactions
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <p className="text-zinc-300 text-sm">
            Your order{" "}
            <span className="font-semibold text-green-400">#{orderId}</span> for
            **₹{amount}** has been placed.
          </p>
          <p className="text-zinc-400 text-xs">
            Redirecting to dashboard in {countdown} seconds...
          </p>
          <button
            onClick={() => navigate("/project")}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Go to Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
