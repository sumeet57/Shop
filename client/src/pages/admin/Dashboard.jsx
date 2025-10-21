import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isPaymentOn, setIsPaymentOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch current status when component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${backendUrl}/api/payments/payment-service-status`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          // assuming server returns { enabled: true/false }
          setIsPaymentOn(data.enabled);
        } else {
          toast.error("Failed to fetch payment service status");
        }
      } catch (error) {
        console.error("Error fetching payment service status:", error);
        toast.error("Server error while fetching service status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [backendUrl]);

  // ✅ Toggle payment service
  const togglePaymentService = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/payments/payment-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !isPaymentOn }),
        credentials: "include",
      });

      if (res.ok) {
        setIsPaymentOn((prev) => !prev);
        toast.success("Payment service status updated");
      } else {
        toast.error("Failed to update payment service status");
      }
    } catch (err) {
      console.error("Error toggling payment service:", err);
      toast.error("Server error while updating service status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full bg-neutral-900 rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="flex flex-col items-center">
          <p className="text-gray-400 mb-4">Payment Service</p>

          <button
            onClick={togglePaymentService}
            disabled={loading}
            className={`relative w-28 h-12 rounded-full transition-all duration-300 ease-in-out font-medium
              ${isPaymentOn ? "bg-green-500" : "bg-red-500"}
              hover:opacity-90 active:scale-95 disabled:opacity-50`}
          >
            {loading ? "..." : isPaymentOn ? "ON" : "OFF"}
          </button>

          <p className="mt-3 text-sm text-gray-400">
            Current Status:{" "}
            <span
              className={`font-semibold ${
                isPaymentOn ? "text-green-400" : "text-red-400"
              }`}
            >
              {loading ? "Loading..." : isPaymentOn ? "Enabled" : "Disabled"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
