import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PurchasedProductCard = ({ item, backendUrl }) => {
  const navigate = useNavigate();
  const correctedImageUrl = item.imageUrl
    ? item.imageUrl.replace(/\\/g, "/")
    : "";

  return (
    <div className="flex items-start space-x-6 bg-zinc-800 p-4 rounded-lg">
      <img
        src={`${backendUrl}/${correctedImageUrl}`}
        alt={item.name}
        className="h-24 w-24 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex flex-col justify-between h-full flex-grow">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 capitalize">
            {item.name}
          </h2>
          <p className="text-sm text-zinc-400 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={() => navigate(`${item._id}`)}
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/cart`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch purchased items");
        const data = await res.json();
        console.log("Fetched purchased items:", data);
        setPurchasedItems(data.data[0].products);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchasedItems();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold mb-8">My Purchased Products</h1>
        {isLoading ? (
          <p>Loading your products...</p>
        ) : !purchasedItems || purchasedItems.length === 0 ? (
          <div className="text-center bg-zinc-800 p-8 rounded-lg">
            <p className="text-xl text-zinc-400">
              You haven't purchased any products yet.
            </p>
            <Link
              to="/shop"
              className="mt-4 inline-block rounded-md bg-teal-600 px-5 py-3 text-base font-medium text-white hover:bg-teal-700"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchasedItems.map((item) => (
              <PurchasedProductCard
                key={item._id}
                item={item}
                backendUrl={backendUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
