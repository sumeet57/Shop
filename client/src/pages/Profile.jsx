import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSignOutAlt,
  FaReceipt,
  FaShoppingCart,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// --- START: Input Group Component ---
const InputGroup = ({
  label,
  name,
  value,
  onChange,
  readOnly = false,
  required = true,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-zinc-300">
      {label} {readOnly ? "(Read Only)" : ""}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      className={`mt-1 block w-full px-3 py-2 border border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-zinc-100 transition duration-150 ${
        readOnly ? "opacity-70 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
// --- END: Input Group Component ---

// --- START: Profile Edit Modal Component ---
const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Name is required.");
      return;
    }
    onSave({ name: formData.name, phone: formData.phone });
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-zinc-900 rounded-xl shadow-2xl shadow-indigo-500/10 w-full max-w-lg p-6 relative text-zinc-100 border border-zinc-700 transition duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4 border-b border-zinc-700 pb-2">
          Edit Personal Information
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-indigo-400 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroup
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={true}
          />
          <InputGroup
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required={false}
          />
          <InputGroup
            label="Email"
            name="email"
            value={formData.email}
            readOnly={true}
          />

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-3 border border-zinc-700 text-zinc-300 font-medium rounded-lg hover:bg-zinc-800 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 font-medium text-white rounded-lg shadow-md transition duration-150 transform hover:scale-[1.02] bg-indigo-600 hover:bg-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// --- END: Profile Edit Modal Component ---

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user");
      setUser(data.user);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
        credentials: "include",
      });

      const updatedUser = await response.json();
      if (!response.ok)
        throw new Error(updatedUser.message || "Failed to update profile");

      // Refresh data after saving
      await fetchUserData();
      handleCloseProfileModal();
    } catch (error) {
      console.error("Save profile error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUserData();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleNavClick = (action) => {
    alert(`Navigating to ${action} page... (Placeholder action)`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-indigo-400 w-full">
        <div className="text-xl font-semibold animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 w-full p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-zinc-100 mb-8 pt-6 border-b border-zinc-700 pb-2">
        User Profile
      </h1>

      <section className="bg-zinc-900 shadow-xl shadow-indigo-500/10 rounded-xl p-6 mb-8 border border-zinc-800">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <p>
            <strong className="block text-zinc-400 text-sm">Name:</strong>
            <span className="text-lg text-zinc-100">{user?.name || "N/A"}</span>
          </p>
          <p>
            <strong className="block text-zinc-400 text-sm">Email:</strong>
            <span className="text-lg text-zinc-100">
              {user?.email || "N/A"}
            </span>
          </p>
          <p>
            <strong className="block text-zinc-400 text-sm">Phone No:</strong>
            <span className="text-lg text-zinc-100">
              {user?.phone || "N/A (Click Edit to Add)"}
            </span>
          </p>
        </div>

        <button
          onClick={handleOpenProfileModal}
          className="mt-2 flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </button>
      </section>

      {/* Navigation Bar */}
      <div className="flex flex-wrap justify-start gap-3 mb-10 p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
        <button
          onClick={() => handleNavClick("Transactions")}
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-400 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-150 transform hover:scale-[1.02]"
        >
          <FaReceipt className="mr-2" /> All Transactions
        </button>
        <button
          onClick={() => handleNavClick("Purchases")}
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-400 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-150 transform hover:scale-[1.02]"
        >
          <FaShoppingCart className="mr-2" /> My Purchases
        </button>
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-400 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition duration-150 transform hover:scale-[1.02]"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
