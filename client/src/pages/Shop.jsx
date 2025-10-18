import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Shop/Header.jsx";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { LuArrowRight } from "react-icons/lu";
import ProductCard from "./shop/ProductCard.jsx";
import "../stylesheet/shop.css";
const ProjectCard = ({ project }) => {
  return (
    <Link to={`/shop/`} className="block group">
      <div className="group flex flex-row md:flex-col h-full overflow-hidden rounded-xl bg-white border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative w-32 md:w-full flex-shrink-0 overflow-hidden">
          <div className="h-full md:h-56 w-full bg-slate-100 flex items-center justify-center">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={project.imageUrl}
              alt={project.name}
            />
          </div>
          {project.stock <= 0 && (
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
          <div className="flex-1">
            <h3 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {project.name}
            </h3>
            <p className="hidden md:block mt-3 text-base text-slate-600 line-clamp-3 h-[72px]">
              {project.projectContext}
            </p>
          </div>

          <div className="mt-3 md:mt-6 flex items-center justify-between">
            <p className="text-xl md:text-3xl font-extrabold text-slate-800">
              ₹{project.price.toLocaleString("en-IN")}
            </p>
            <div className="flex items-center text-sm font-semibold text-teal-600">
              <span className="hidden md:inline">View Project</span>
              <LuArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("iot");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Network response was not ok");
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

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === activeCategory
  );

  return (
    <>
      <div className="shop-background">
        <Header />
        {location.pathname === "/" ? (
          <section
            id="projects"
            className="py-16 sm:py-20 text-slate-900 h-fit"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-16">
                <div className="bg-slate-50 p-1.5 rounded-xl flex items-center space-x-1 shadow-inner">
                  <button
                    onClick={() => setActiveCategory("iot")}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === "iot"
                        ? "bg-orange-600 text-white shadow-md shadow-sky-600/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    IoT Projects
                  </button>
                  <button
                    onClick={() => setActiveCategory("web")}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeCategory === "web"
                        ? "bg-orange-600 text-white shadow-md shadow-sky-600/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    Web Projects
                  </button>
                </div>
              </div>

              <div>
                {isLoading && (
                  <p className="text-center text-slate-500">
                    Loading projects...
                  </p>
                )}
                {error && (
                  <p className="text-center text-red-500">Error: {error}</p>
                )}
                {!isLoading && !error && (
                  <div className="flex justify-center items-center flex-wrap gap-7 h-fit">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((project) => (
                        <>
                          <ProductCard
                            key={project._id + 2}
                            product={project}
                          />
                        </>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-xl text-slate-500">
                          No projects found in this category.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <Outlet />
        )}
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Shop;
