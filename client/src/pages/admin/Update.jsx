import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LuUpload, LuX, LuPlus, LuTrash2 } from "react-icons/lu";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "iot",
    projectContext: "",
    features: [],
    includes: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [featureInput, setFeatureInput] = useState("");
  const [includeInput, setIncludeInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setFormData({
          ...data,
          features: data.features || [],
          includes: data.includes || [],
        });
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAddItem = (type) => {
    if (type === "feature" && featureInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    } else if (type === "include" && includeInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        includes: [...prev.includes, includeInput.trim()],
      }));
      setIncludeInput("");
    }
  };

  const handleRemoveItem = (type, index) => {
    if (type === "feature") {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    } else if (type === "include") {
      setFormData((prev) => ({
        ...prev,
        includes: prev.includes.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSubmit = new FormData();

    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("description", formData.description);
    dataToSubmit.append("price", formData.price);
    dataToSubmit.append("stock", formData.stock);
    dataToSubmit.append("category", formData.category);
    dataToSubmit.append("projectContext", formData.projectContext);
    dataToSubmit.append("features", JSON.stringify(formData.features));
    dataToSubmit.append("includes", JSON.stringify(formData.includes));

    if (imageFile) {
      dataToSubmit.append("file", imageFile);
    }

    try {
      const response = await fetch(`${backendUrl}/api/products/update/${id}`, {
        method: "PUT",
        body: dataToSubmit,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Product updated successfully!");
        navigate(-1);
      } else {
        toast.error(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full bg-transparent border-b-2 border-zinc-700 text-zinc-200 py-2 text-base focus:outline-none focus:border-emerald-500 transition-colors duration-300";

  if (isLoading)
    return (
      <div className="text-center p-10 text-zinc-300">
        Loading product details...
      </div>
    );
  if (error)
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <header className="pb-6 mb-8 border-b border-zinc-700">
          <h1 className="text-4xl font-bold text-zinc-100">Update Product</h1>
          <p className="text-zinc-400 mt-2">
            Edit the details for "{formData.name}" below.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Product Image
              </label>
              <div className="mt-2 w-full h-80 rounded-lg border-2 border-dashed border-zinc-600 flex items-center justify-center relative bg-zinc-900 overflow-hidden">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!imagePreview ? (
                  <div className="text-center">
                    <LuUpload className="mx-auto h-12 w-12 text-zinc-500" />
                    <p className="mt-2 text-sm text-zinc-400">
                      <span className="font-semibold text-emerald-500">
                        Upload new image
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-zinc-900/50 rounded-full text-white hover:bg-zinc-900 transition-colors"
                    >
                      <LuX size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputStyle} mt-2`}
                  >
                    <option value="iot">IoT</option>
                    <option value="web dev">Web Dev</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="projectContext"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Project Context
                </label>
                <textarea
                  name="projectContext"
                  id="projectContext"
                  value={formData.projectContext}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputStyle} mt-2`}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={`${inputStyle} mt-2`}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-700 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Features
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem("feature")}
                  className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <LuPlus size={18} />
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {formData.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-zinc-800 p-2 rounded"
                  >
                    <span className="text-zinc-300">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("feature", index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                What's Included
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={includeInput}
                  onChange={(e) => setIncludeInput(e.target.value)}
                  placeholder="Add an included item"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem("include")}
                  className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <LuPlus size={18} />
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {formData.includes.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-zinc-800 p-2 rounded"
                  >
                    <span className="text-zinc-300">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("include", index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="mt-12 pt-6 border-t border-zinc-700 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/40 disabled:bg-emerald-900 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Update;
