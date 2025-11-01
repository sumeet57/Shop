import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProductCard from "./shop/ProductCard.jsx";
import "../stylesheet/shop.css";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("iot");
  const [searchText, setSearchText] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();

  // ✅ Ref to scroll to Custom Project Section
  const customSectionRef = useRef(null);

  const scrollToCustomSection = () => {
    customSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  // ✅ Search only by name
  const filtered = products.filter((p) => {
    const title = p?.name?.toLowerCase() || "";
    const category = p?.category?.toLowerCase() || "";
    const text = searchText.toLowerCase();

    return category === activeCategory && title.includes(text);
  });

  return (
    <div className="shop-background min-h-screen text-white">
      {location.pathname === "/" ? (
        <section className="pt-10 pb-6">
          <div className="max-w-7xl mx-auto px-4">
            {/* ✅ Header */}
            <div className="text-center mb-6 pt-10">
              <h1 className="text-3xl md:text-4xl font-secondary-style font-extrabold tracking-tight text-white drop-shadow-sm">
                Premium Readymade Final-Year Project
              </h1>
              <p className="text-slate-300 font-primary-style text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Includes full blackbook content, all diagrams (DFD, Block,
                Circuit, etc) and delivery to your nearest location (only in
                Mumbai)
              </p>
            </div>

            {/* ✅ Category Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-lg px-2 py-1 rounded-xl shadow-md border border-white/10 flex space-x-1">
                {["iot", "web"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                      ${
                        activeCategory === cat
                          ? "bg-orange-500 text-white shadow-md scale-[1.03]"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {cat === "iot" ? "IoT Projects" : "Web Projects"}
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ Search Bar */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-xl">
                <input
                  className="w-full px-4 py-3 pl-12 rounded-xl bg-white/20 text-white
                  placeholder-slate-300 backdrop-blur-xl shadow-lg
                  border border-white/20 focus:ring-2 focus:ring-orange-400
                  transition-all duration-300"
                  placeholder="Search project..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="absolute left-4 top-3 text-lg text-slate-200">
                  🔍
                </span>
              </div>
            </div>

            {/* ✅ Product Grid */}
            {!isLoading && !error && (
              <div
                className="
                  grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 
                  gap-8 pb-10
                "
              >
                {filtered.length > 0 ? (
                  filtered.map((p, i) => <ProductCard key={i} product={p} />)
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-xl text-slate-300 mb-4">
                      No matching project found.
                    </p>

                    {/* ✅ Custom Project Button */}
                    <button
                      onClick={scrollToCustomSection}
                      className="px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-medium shadow-lg hover:bg-orange-600 transition-all duration-200"
                    >
                      Want a custom project?
                    </button>
                  </div>
                )}
              </div>
            )}

            {isLoading && (
              <div className="text-center text-slate-300 text-lg">
                <LoadingScreen />
              </div>
            )}

            {error && (
              <p className="text-center text-red-400 text-lg">{error}</p>
            )}

            {/* ✅ CUSTOM PROJECT ENQUIRY SECTION */}
            <div ref={customSectionRef} className="mt-20 pb-20 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Can't find the project you're looking for?
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
                Tell us your custom project idea — we will build it for you from
                scratch with full blackbook, diagrams, explanation, and hardware
                support.
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/sumeet.codes/"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-pink-500/40 hover:scale-[1.05] transition-all duration-300"
                >
                  <FaInstagram className="text-lg" />
                  Instagram
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919321635813"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 hover:shadow-green-500/40 hover:scale-[1.05] transition-all duration-300"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sumeet-umbalkar"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/40 hover:scale-[1.05] transition-all duration-300"
                >
                  <FaLinkedin className="text-lg" />
                  LinkedIn
                </a>

                {/* Email */}
                <a
                  href="mailto:sum.pro57@gmail.com"
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 hover:shadow-red-500/40 hover:scale-[1.05] transition-all duration-300"
                >
                  <FaEnvelope className="text-lg" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Shop;
