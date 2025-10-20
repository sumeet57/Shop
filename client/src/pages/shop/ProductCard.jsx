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
          <span className="absolute top-3 right-3 px-3 py-1 bg-indigo-600 text-xs font-bold uppercase rounded-full tracking-wider shadow-md">
            {product.category}
          </span>
        )}

        <div className="p-5 flex flex-col space-y-3 flex-grow">
          <h2 className="text-2xl font-extrabold text-white leading-snug">
            {product?.name}
          </h2>
          <p className="text-sm text-gray-400 flex-grow line-clamp-3">
            {product?.projectContext}
          </p>
          <div className="pt-2">
            <h3 className="text-3xl font-bold text-green-400">
              ₹{product?.price?.toLocaleString("en-IN") || "N/A"}
            </h3>
          </div>
        </div>

        <div className="flex p-4 border-t border-gray-700 justify-between space-x-3">
          <button
            onClick={clickHandler}
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border border-indigo-600 text-indigo-400 hover:bg-indigo-900 transition-colors duration-200"
          >
            View Project
          </button>
          <button
            onClick={clickHandler}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition-colors duration-200 ${
              product?.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={product?.stock <= 0}
          >
            {product?.stock > 0 ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
