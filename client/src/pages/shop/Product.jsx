import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { LuArchive } from "react-icons/lu";
import { FcApproval } from "react-icons/fc";
import { productApi } from "../../interceptors/product.api";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await productApi.get(`/${productId}`);
        if (res) {
          const { data } = res;
          setProduct(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, backendUrl]);

  const handleBuyNow = () => {
    navigate("checkout", { state: { product } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="text-center">
          <p className="text-xl text-zinc-400">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const includes = Array.isArray(product.includes) ? product.includes : [];

  return (
    <>
      {location.pathname === `/${productId}` ? (
        <div className="product_detail text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              {/* FIX: Add h-full to this parent container to match the sibling's height */}
              <div className="w-full h-full">
                <div className="sticky top-24 rounded-2xl shadow-2xl shadow-zinc-800/50 overflow-hidden border border-zinc-700/50 lg:max-h-fit">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              </div>

              {/* This element is already set to h-full, defining the necessary column height */}
              <div className="flex flex-col h-full lg:pt-4">
                <div className="mb-4">
                  <span className="inline-block bg-zinc-700 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-100">
                  {product.name}
                </h1>
                <div className="mt-6">
                  <p className="text-5xl font-extrabold text-emerald-500">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
                {product.projectContext && (
                  <div className="mt-8">
                    <p className="text-lg text-slate-300 italic leading-relaxed">
                      {product.projectContext}
                    </p>
                  </div>
                )}
                <div className="mt-12 pt-12 border-t border-zinc-700 space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-5">
                      Description
                    </h3>
                    <p className="text-base text-slate-300 leading-7 whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>

                  {features.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-5">
                        Features
                      </h3>
                      <ul className="space-y-4">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FcApproval className="flex-shrink-0 h-6 w-6 text-emerald-500 mt-0.5 mr-4" />
                            <span className="text-slate-300 text-lg capitalize">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {includes.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-5">
                        What's Included
                      </h3>
                      <ul className="space-y-4">
                        {includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <LuArchive className="flex-shrink-0 h-6 w-6 text-emerald-500 mt-0.5 mr-4" />
                            <span className="text-slate-300 text-lg capitalize">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-700">
                  <p className="text-sm font-medium mb-4">
                    {product.stock > 0 ? (
                      <span className="text-green-400 font-bold">
                        In Stock ✓
                      </span>
                    ) : product.category === "iot" ? (
                      <span className="text-red-400 font-bold">
                        Out of Stock ✗
                      </span>
                    ) : (
                      <span className="text-green-400 font-bold">
                        Currently available ✓
                      </span>
                    )}
                  </p>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full rounded-xl bg-emerald-600 px-8 py-4 text-xl font-bold text-white shadow-lg shadow-emerald-600/40 transition-all duration-300 transform hover:scale-[1.01] hover:bg-emerald-500 disabled:bg-zinc-600 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Outlet context={{ product }} />
      )}
    </>
  );
};

export default Product;
