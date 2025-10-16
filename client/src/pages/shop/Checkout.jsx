import React, { useState, useEffect } from "react";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import { toast } from "react-toastify";
// Ensure you have also included the ToastContainer component in your application root

const VALID_IOT_PINCODES = ["400001", "400002", "400003", "400004", "400005"];

const IotPincodeChecker = ({ pincode, isIotProduct }) => {
  if (!isIotProduct) return null;

  if (pincode.length === 0) return null;

  if (!VALID_IOT_PINCODES.includes(pincode)) {
    return (
      <p className="text-sm text-red-400 font-semibold mt-2">
        ⚠️ Not deliverable to this Pincode. Please check your location.
      </p>
    );
  }

  return (
    <p className="text-sm text-green-400 font-semibold mt-2">
      ✅ Deliverable within 2 - 3 business days.
    </p>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const productId = params.productId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const product = location.state.product;
  const isIotProduct = product?.category?.toLowerCase() === "iot";

  const { user } = React.useContext(UserContext);

  const [formData, setFormData] = useState({
    userId: null,
    userName: "Guest",
    userEmail: "",
    productId: productId,
    userAddress: "",
    userPhone: "",
    userPincode: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user._id || null,
        userName: user.name || "Guest",
        userEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "userAddress") {
      value = value.substring(0, 300);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBuyNow = async () => {
    // 1. Alert that payment gateway is not integrated
    toast.error("Payment gateway not integrated.");

    const checkoutData = {
      ...formData,
    };

    if (!isIotProduct) {
      delete checkoutData.userPincode;
      delete checkoutData.userAddress;
    }

    try {
      const res = await fetch(`${backendUrl}/api/payments/checkout-mock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success("Order Placed (Mock Success)!");
        console.log("Mock Checkout Success:", data);
      } else {
        toast.error("Mock Checkout Failed. Please try again.");
        console.error("Failed to complete mock checkout");
      }
    } catch (err) {
      toast.error("Network error during checkout.");
      console.error(err);
    }
  };

  const isPincodeValid = VALID_IOT_PINCODES.includes(formData.userPincode);
  const isFormValid = isIotProduct
    ? formData.userPhone &&
      formData.userPincode &&
      isPincodeValid &&
      formData.userAddress
    : formData.userPhone;

  return (
    <div className="product_checkout min-h-screen text-white p-4 sm:p-8 pt-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <p className="text-sm text-zinc-400">
                  Stock Remaining:{" "}
                  <span className="font-bold text-slate-100">
                    {product.stock}
                  </span>
                </p>

                <div className="pt-2">
                  {isIotProduct ? (
                    <>
                      <p className="text-sm font-semibold text-yellow-400">
                        Estimated Delivery: 2 - 3 business days.
                      </p>
                      <p className="text-xs text-red-400 mt-1">
                        *Note: This IOT product is currently deliverable only in
                        specified Pincodes of Mumbai.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-semibold text-yellow-400">
                      Digital Delivery: Instant (Web Dev).
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl shadow-zinc-900/50 border border-zinc-700/50">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400">
            Contact & Shipping
          </h2>
          <div className="space-y-5">
            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Name"
              type="text"
              name="userName"
              id="name"
              value={formData.userName}
              readOnly={!user}
            />
            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Email"
              type="email"
              name="userEmail"
              id="email"
              value={formData.userEmail}
              readOnly={!user}
            />

            <input
              className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Phone Number"
              type="tel"
              name="userPhone"
              id="phone"
              value={formData.userPhone}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500"
                placeholder="City"
                type="text"
                value="Mumbai"
                readOnly
              />
              <input
                className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500"
                placeholder="Country"
                type="text"
                value="India"
                readOnly
              />
            </div>

            {isIotProduct && (
              <>
                <input
                  className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  placeholder="Pincode"
                  type="text"
                  name="userPincode"
                  id="pincode"
                  value={formData.userPincode}
                  onChange={handleInputChange}
                />

                <IotPincodeChecker
                  pincode={formData.userPincode}
                  isIotProduct={isIotProduct}
                />

                <div className="relative">
                  <textarea
                    className="w-full border border-zinc-700 bg-zinc-900/50 p-4 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors min-h-[120px]"
                    placeholder="Shipping Address (Max 300 characters)"
                    name="userAddress"
                    id="address"
                    value={formData.userAddress}
                    onChange={handleInputChange}
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-zinc-500">
                    {formData.userAddress.length}/300
                  </span>
                </div>
              </>
            )}
          </div>
          <button
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-emerald-600/40 transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
            onClick={handleBuyNow}
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
