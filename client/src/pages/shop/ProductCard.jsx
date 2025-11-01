import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/${product._id}`);
  };
  return (
    <>
      <div className="relative productCard w-full max-w-xs overflow-hidden shadow-2xl bg-zinc-900 text-white transition-all duration-300">
        <div className="h-40 overflow-hidden bg-gray-700 flex items-center justify-center">
          <img
            className="w-full h-full object-cover transition-opacity duration-500"
            src={product?.imageUrl}
            alt={product?.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/4f46e5/ffffff?text=Image+Unavailable";
            }}
          />
        </div>

        {product?.category && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-xs font-bold uppercase rounded-full tracking-wider shadow-md">
            {product.category}
          </span>
        )}

        <div className="p-4 flex flex-col space-y-3 flex-grow">
          <h2 className="text-xl font-extrabold font-secondary-style text-white leading-snug">
            {product?.name}
          </h2>
          <p className="text-md text-gray-400 font-primary-style flex-grow line-clamp-3">
            {product?.projectContext}
          </p>
          <div className="pt-0">
            <h3 className="text-xl font-bold font-secondary-style text-green-400">
              ₹{product?.price?.toLocaleString("en-IN") || "N/A"}
            </h3>
          </div>
        </div>

        <div className="flex p-3 border-t border-gray-700 justify-between space-x-2">
          <button
            onClick={clickHandler}
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border border-orange-600 text-orange-400 hover:bg-orange-900 transition-colors duration-200 hover:cursor-pointer"
          >
            View Project
          </button>
          <button
            onClick={clickHandler}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-orange-600 text-white shadow-lg shadow-orange-500/50 hover:bg-orange-700 transition-colors duration-200 hover:cursor-pointer ${
              product?.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={product?.stock <= 0}
          >
            {product?.category === "iot"
              ? product?.stock > 0
                ? "Order Now"
                : "Out of Stock"
              : "Buy Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
