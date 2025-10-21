import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { load } from "@cashfreepayments/cashfree-js";

const WESTERN_LINE_STATIONS = [
  "Churchgate",
  "Marine Lines",
  "Charni Road",
  "Grant Road",
  "Mumbai Central",
  "Mahalaxmi",
  "Lower Parel",
  "Prabhadevi",
  "Dadar",
  "Matunga Road",
  "Mahim",
  "Bandra",
  "Khar Road",
  "Santacruz",
  "Vile Parle",
  "Andheri",
  "Jogeshwari",
  "Ram Mandir",
  "Goregaon",
  "Malad",
  "Kandivali",
  "Borivali",
  "Dahisar",
  "Mira Road",
  "Bhayandar",
  "Naigaon",
  "Vasai Road",
  "Nallasopara",
  "Virar",
];

const StationSelector = ({ selectedStation, setSelectedStation }) => {
  const [search, setSearch] = useState("");

  const filteredStations = WESTERN_LINE_STATIONS.filter((station) =>
    station.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      <label className="block text-zinc-400 font-medium mb-2 text-sm">
        Select Nearest Western Line Station
      </label>

      <div className="relative mb-3">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg py-3 pl-10 pr-3 placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none transition"
        />
      </div>

      <div className="max-h-48 overflow-y-auto border border-zinc-700 rounded-lg bg-zinc-900 shadow-inner">
        {filteredStations.length > 0 ? (
          filteredStations.map((station) => (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                selectedStation === station
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              {station}
            </button>
          ))
        ) : (
          <p className="p-3 text-zinc-500 text-sm italic">No station found</p>
        )}
      </div>

      {selectedStation && (
        <p className="mt-3 text-sm text-green-400 font-semibold">
          ✅ Deliverable via: {selectedStation} Station
        </p>
      )}
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const productId = params.productId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [OrderId, setOrderId] = useState(null);

  let cashfree;
  const initializeSdk = async () => {
    cashfree = await load({
      mode: "SANDBOX",
    });
  };
  initializeSdk();

  const product = location.state?.product;
  const isIotProduct = product?.category?.toLowerCase() === "iot";

  const { user } = React.useContext(UserContext);

  const [formData, setFormData] = useState({
    userId: null,
    userName: "Guest",
    userEmail: "",
    userPhone: "",
    selectedStation: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user._id || null,
        userName: user.name || "Guest",
        userEmail: user.email || "",
        userPhone: user.phone || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBuyNow = async () => {
    const checkoutData = { ...formData, productId };

    try {
      const res = await fetch(`${backendUrl}/api/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success("Order ID generated successfully!");
        console.log("data from checkout:", data);
        setOrderId(data.orderId); // still store for future use
        await initializeCashfreePayment(data.paymentSessionId, data.orderId);
      } else {
        console.log(data, res);
        toast.error("Mock Checkout Failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error during checkout.");
      console.error(err);
    }
  };

  const initializeCashfreePayment = async (sessionId, orderId) => {
    try {
      const options = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
        mode: "SANDBOX",
      };
      await cashfree
        .checkout(options)
        .then((data) => {
          console.log("Cashfree payment data:", data);
          if (data.error) {
            failedPayment(orderId);
            return;
          }
          verifyPayment(orderId);
        })
        .catch((err) => {
          console.error("Cashfree checkout error:", err);
        });
    } catch (err) {
      console.error("Error in Cashfree payment:", err);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      const res = await fetch(`${backendUrl}/api/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderId: orderId }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 201) {
        toast.success("Payment verified and order completed!");
        navigate("/");
      } else if (res.status === 400) {
        toast.error("Payment failed or incomplete.");
      } else if (res.status === 404) {
        toast.error("Order not found for verification.");
      } else if (res.status === 500) {
        toast.error("Server error during payment verification.");
      } else if (res.status === 409) {
        toast.info("Product is already in the cart.");
      } else {
        toast.error("Unexpected error during payment verification.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };
  const failedPayment = async (orderId) => {
    try {
      const resF = await fetch(`${backendUrl}/api/payments/failed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderId: orderId }),
        credentials: "include",
      });
      if (resF.status === 200) {
        toast.error("Payment failed. Please try again.");
      } else {
        toast.error("Error reporting failed payment.");
      }
    } catch (error) {
      console.error("Error reporting failed payment:", error);
    }
  };

  const isFormValid = isIotProduct
    ? formData.userPhone && formData.selectedStation
    : formData.userPhone;

  return (
    <div className="product_checkout min-h-screen text-white p-4 sm:p-8 pt-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 h-fit">
          {product && (
            <div className="sticky top-20 bg-zinc-800 p-6 rounded-2xl shadow-xl shadow-zinc-900/50 border border-zinc-700/50">
              <h3 className="text-xl font-bold mb-4 text-emerald-400 border-b border-zinc-700 pb-3">
                Order Summary
              </h3>
              <div className="space-y-4">
                <p className="text-2xl font-semibold text-slate-100">
                  {product.name}
                </p>
                <div className="text-sm space-y-1">
                  <p className="text-zinc-400">
                    <span className="font-semibold text-emerald-300">
                      Category:
                    </span>{" "}
                    {product.category}
                  </p>
                  <p className="text-zinc-400">
                    <span className="font-semibold text-emerald-300">
                      Context:
                    </span>{" "}
                    {product.projectContext}
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-700 space-y-3">
                <p className="text-3xl font-extrabold text-green-400">
                  ₹ {product.price.toLocaleString("en-IN")}
                </p>
                <p
                  className={`text-sm text-zinc-400 ${
                    product.category == "web" ? "hidden" : ""
                  }`}
                >
                  Stock Remaining:{" "}
                  <span className="font-bold text-slate-100">
                    {product.stock}
                  </span>
                </p>

                <div className="pt-2">
                  {isIotProduct ? (
                    <>
                      <p className="text-sm font-semibold text-yellow-400">
                        Estimated Delivery: 2 - 3 business days via local pickup
                        station.
                      </p>
                      <p className="text-xs text-red-400 mt-1">
                        *Note: IoT products are available only for specific
                        Mumbai stations.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-yellow-400">
                      <strong className="text-white">Digital Delivery:</strong>{" "}
                      The product is instantly added to your account's{" "}
                      <span className="text-green-300">Purchase Section</span>.
                      The Google Drive link{" "}
                      <span className="text-green-300">
                        (files & source-code)
                      </span>
                      {" ,"}access will be granted to your{" "}
                      <span className="text-green-300">registered email</span>{" "}
                      within 12 hours.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact & Delivery Section */}
        <div className="lg:col-span-2 bg-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl shadow-zinc-900/50 border border-zinc-700/50">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400">
            Contact & Delivery
          </h2>

          <div className="space-y-5">
            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Name"
              type="text"
              name="userName"
              value={formData.userName}
              readOnly={!user}
            />
            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Email"
              type="email"
              name="userEmail"
              value={formData.userEmail}
              readOnly={!user}
            />
            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Phone Number"
              type="tel"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleInputChange}
            />

            {isIotProduct && (
              <StationSelector
                selectedStation={formData.selectedStation}
                setSelectedStation={(station) =>
                  setFormData({ ...formData, selectedStation: station })
                }
              />
            )}
          </div>

          <button
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-emerald-600/40 transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
            // onClick={handleBuyNow}
            disabled={!isFormValid}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
