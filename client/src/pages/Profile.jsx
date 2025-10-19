import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSignOutAlt,
  FaReceipt,
  FaShoppingCart,
  FaEdit,
} from "react-icons/fa";

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

const AddressModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    _id: null,
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const isUpdate = !!initialData;
  const modalTitle = isUpdate ? "Update Address" : "Add New Address";

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        _id: null,
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.pinCode
    ) {
      alert("Please fill in all fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-zinc-900 rounded-xl shadow-2xl shadow-indigo-500/10 w-full max-w-lg p-6 relative text-zinc-100 border border-zinc-700 transition duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4 border-b border-zinc-700 pb-2">
          {modalTitle}
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
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <InputGroup
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <InputGroup
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>

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
              className={`px-6 py-2 font-medium text-white rounded-lg shadow-md transition duration-150 transform hover:scale-[1.02] ${
                isUpdate
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isUpdate ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddressCard = ({ address, onUpdate, onDelete, index }) => {
  const { address: street, city, state, country, pinCode, _id } = address;

  return (
    <div className="bg-zinc-800 p-5 rounded-xl shadow-lg shadow-zinc-800/50 hover:shadow-indigo-500/20 transition duration-300 border border-zinc-700 w-full">
      <h3 className="text-md font-bold text-indigo-400 mb-2">
        Address No. {index}
      </h3>
      <div className="space-y-1 text-zinc-300 text-sm">
        <p className="font-semibold">{street}</p>
        <p>
          {city}, {state} -{" "}
          <span className="font-medium text-zinc-100">{pinCode}</span>
        </p>
        <p className="text-xs italic text-zinc-400">{country}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-700 flex space-x-3">
        <button
          onClick={onUpdate}
          className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="flex-1 px-3 py-2 text-sm font-semibold text-red-400 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition duration-150 transform hover:scale-[1.02]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

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
      setAddresses(data.user.addresses || []);
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

  const handleOpenAddressModal = (addressToEdit = null) => {
    setEditingAddress(addressToEdit);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSaveAddress = async (addressData) => {
    const isUpdate = !!addressData._id;
    const method = isUpdate ? "PUT" : "POST";
    const url = isUpdate
      ? `${backendUrl}/api/user/addresses/${addressData._id}`
      : `${backendUrl}/api/user/addresses`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
        credentials: "include",
      });

      const savedAddress = await response.json();
      if (!response.ok)
        throw new Error(savedAddress.message || "Failed to save address");

      setAddresses(savedAddress.userAddresses);
      handleCloseAddressModal();
    } catch (error) {
      console.error("Save address error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const response = await fetch(
        `${backendUrl}/api/user/addresses/${addressId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete address");
      }

      setAddresses(addresses.filter((addr) => addr._id !== addressId));
    } catch (error) {
      console.error("Delete address error:", error);
      alert(`Error: ${error.message}`);
    }
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
          onClick={() => handleNavClick("Logout")}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-400 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition duration-150 transform hover:scale-[1.02]"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Address Section */}
      <section className="bg-zinc-900 shadow-xl shadow-indigo-500/10 rounded-xl p-6 border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-indigo-400">
            Saved Addresses
          </h2>
          <button
            onClick={() => handleOpenAddressModal()}
            className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 transform hover:scale-[1.02]"
          >
            <FaPlus className="mr-2" /> Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <AddressCard
                key={address._id}
                address={address}
                index={index + 1}
                onUpdate={() => handleOpenAddressModal(address)}
                onDelete={handleDeleteAddress}
              />
            ))
          ) : (
            <p className="text-zinc-400 italic">
              No addresses saved. Click “Add Address” to add one.
            </p>
          )}
        </div>
      </section>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />

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
