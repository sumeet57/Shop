import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, Eye, Search, ArrowUp, ArrowDown } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const handleDelete = (id) => {};

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let result = 0;
      if (sortKey === "price") {
        result = a.price - b.price;
      } else if (sortKey === "stock") {
        const aStock = a.stock > 0 ? 0 : 1;
        const bStock = b.stock > 0 ? 0 : 1;
        result = aStock - bStock;
      } else if (sortKey === "category") {
        result = a.category.localeCompare(b.category);
      } else {
        result = a.name.localeCompare(b.name);
      }

      return sortOrder === "asc" ? result : -result;
    });
  }, [products, searchTerm, sortKey, sortOrder]);

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-10">Loading products...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Product Inventory ({products.length})
        </h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex-shrink-0"
        >
          Create Product
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="flex-grow appearance-none bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Out of Stock First</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white border border-gray-600 transition-colors flex-shrink-0"
          >
            {sortOrder === "asc" ? (
              <ArrowUp size={20} />
            ) : (
              <ArrowDown size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="lg:col-span-2 text-gray-400 text-center py-12 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50">
            <p className="text-xl font-semibold">No products found.</p>

            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-xl p-3 flex items-center gap-4 shadow-lg border border-gray-700 hover:border-indigo-600 transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-700 shadow-md"
              />

              <div className="flex-grow min-w-0">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest truncate">
                  {product.category}
                </p>

                <h2 className="text-base font-semibold text-white truncate">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 text-sm mt-1">
                  <span className="font-bold text-emerald-400">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-600">•</span>

                  <span
                    className={`font-medium ${
                      product.stock === 0 ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    <span className="text-white">{product.stock}</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors">
                  <Eye size={18} />
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/update-product/${product._id}`)
                  }
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors"
                >
                  <Edit3 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
