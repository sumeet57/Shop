import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuUpload, LuX, LuPlus, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";

const Create = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "iot",
    projectContext: "",
    features: [],
    includes: [],
    projectLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [includeInput, setIncludeInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    if (!imageFile) {
      toast.error("Please upload a product image.");
      return;
    }
    const { category } = formData;
    if (category === "iot" && formData.stock === "") {
      toast.error("Stock is required for IOT products.");
      return;
    }
    setIsSubmitting(true);

    const dataToSubmit = new FormData();

    dataToSubmit.append("name", formData.name);
    if (category !== "custom") {
      dataToSubmit.append("description", formData.description);
      dataToSubmit.append("projectContext", formData.projectContext);
    }
    dataToSubmit.append("price", formData.price);

    if (category === "iot") {
      dataToSubmit.append("stock", formData.stock);
    } else if (category === "web") {
      dataToSubmit.append("stock", 999999);
    } else if (category === "custom") {
      dataToSubmit.append("stock", 0);
    }
    if (category === "iot" || category === "web") {
      dataToSubmit.append("projectLink", formData.projectLink);
    }

    dataToSubmit.append("category", formData.category);
    dataToSubmit.append("file", imageFile);

    if (category !== "web") {
      dataToSubmit.append("features", JSON.stringify(formData.features));
      dataToSubmit.append("includes", JSON.stringify(formData.includes));
    }

    try {
      console.log("Submitting form data...");
      const response = await fetch(`${backendUrl}/api/products/create`, {
        method: "POST",
        body: dataToSubmit, // <--- CORRECTED: Sending the FormData object
        credentials: "include",
      });

      const data = await response.json();

      console.log("Server response:", data);
      if (response.ok) {
        toast.success("Product created successfully!");
        navigate(-1);
      } else {
        toast.error(data.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputStyle =
    "w-full bg-transparent border-b-2 border-zinc-700 text-zinc-100 py-2 text-base focus:outline-none focus:border-emerald-500 transition-colors duration-300 placeholder-zinc-500";
  const { category } = formData;
  const isStockVisible = category === "iot";
  const isLinkVisible = category === "iot" || category === "web";
  const isDescriptionVisible = category !== "custom";
  const isProjectContextVisible = category !== "custom";
  const isFeatureAndIncludeVisible = category !== "web";
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-zinc-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="pb-6 mb-8 border-b border-zinc-800">
          <h1 className="text-4xl font-extrabold text-white">
            Create a New Product
          </h1>
          <p className="text-zinc-400 mt-2">
            Add a new item to your inventory by filling out the form below.
          </p>
        </header>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Product Image
              </label>

              <div className="mt-2 w-full h-80 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center relative bg-zinc-800 overflow-hidden shadow-inner shadow-zinc-900/50">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {!imagePreview ? (
                  <div className="text-center p-4">
                    <LuUpload className="mx-auto h-12 w-12 text-zinc-500" />
                    <p className="mt-2 text-sm text-zinc-400">
                      <span className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
                        Click to upload
                      </span>
                      or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      PNG, JPG (max. 5MB)
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
                      className="absolute top-2 right-2 p-1.5 bg-zinc-900/70 rounded-full text-white hover:bg-zinc-800 transition-colors"
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

                  <div className="relative">
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-100 py-2.5 px-3 pr-8 rounded-lg text-sm appearance-none focus:outline-none focus:border-emerald-500 transition-colors mt-2"
                    >
                      <option value="iot" className="bg-zinc-900">
                        IOT
                      </option>

                      <option value="web" className="bg-zinc-900">
                        WEB
                      </option>

                      <option value="custom" className="bg-zinc-900">
                        Custom
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center px-2 text-zinc-500 mt-1">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
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

                {isStockVisible && (
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
                      required={isStockVisible}
                      min="0"
                      className={inputStyle}
                    />
                  </div>
                )}
              </div>

              {isLinkVisible && (
                <div>
                  <label
                    htmlFor="projectLink"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Project Drive Link
                  </label>

                  <input
                    type="url"
                    name="projectLink"
                    id="projectLink"
                    value={formData.projectLink}
                    onChange={handleChange}
                    required={isLinkVisible}
                    placeholder="e.g., Google Drive or GitHub link"
                    className={inputStyle}
                  />
                </div>
              )}

              {isProjectContextVisible && (
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
                    required={isProjectContextVisible}
                    placeholder="A short description for product listing/cards."
                    className={`${inputStyle} mt-2`}
                  />
                </div>
              )}

              {isDescriptionVisible && (
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Full Description
                  </label>

                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Detailed description of the product or service."
                    className={`${inputStyle} mt-2`}
                  />
                </div>
              )}
            </div>
          </div>
          {isFeatureAndIncludeVisible && (
            <div className="mt-10 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Features
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a key feature"
                    className={inputStyle}
                  />

                  <button
                    type="button"
                    onClick={() => handleAddItem("feature")}
                    className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex-shrink-0"
                    disabled={!featureInput.trim()}
                  >
                    <LuPlus size={18} />
                  </button>
                </div>

                <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-2">
                  {formData.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-zinc-800 p-2 rounded border border-zinc-700 text-sm"
                    >
                      <span className="text-zinc-200">{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("feature", index)}
                        className="text-red-500 hover:text-red-400 transition-colors p-1"
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
                    className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex-shrink-0"
                    disabled={!includeInput.trim()}
                  >
                    <LuPlus size={18} />
                  </button>
                </div>

                <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-2">
                  {formData.includes.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-zinc-800 p-2 rounded border border-zinc-700 text-sm"
                    >
                      <span className="text-zinc-200">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("include", index)}
                        className="text-red-500 hover:text-red-400 transition-colors p-1"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <footer className="mt-12 pt-6 border-t border-zinc-800 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/40 disabled:bg-emerald-800 disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Create;
