import React, { useState, useEffect } from "react";

const InputGroup = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          {modalTitle}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
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
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
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
              className="px-4 py-2 mr-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 font-medium text-white rounded-lg shadow-md transition duration-150 ${
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

const AddressCard = ({ address, onUpdate, onDelete }) => {
  const { address: street, city, state, country, pinCode, _id } = address;

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Delivery Address
      </h3>
      <div className="space-y-1 text-gray-600">
        <p>{street}</p>
        <p>
          {city}, {state} - <span className="font-medium">{pinCode}</span>
        </p>
        <p className="text-sm italic">{country}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-3">
        <button
          onClick={onUpdate}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-150"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition duration-150"
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      console.log("Fetched user data:", data);
      if (!response.ok) throw new Error(data.message || "Failed to fetch user");
      setUser(data);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/user/addresses");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch addresses");
      setAddresses(data);
    } catch (error) {
      console.error("Addresses fetch error:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUserData();
      await fetchAddresses();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenModal = (addressToEdit = null) => {
    setEditingAddress(addressToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = async (addressData) => {
    const isUpdate = !!addressData._id;
    const method = isUpdate ? "PUT" : "POST";
    const url = isUpdate
      ? `/api/user/addresses/${addressData._id}`
      : "/api/user/addresses";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      });

      const savedAddress = await response.json();

      if (!response.ok)
        throw new Error(savedAddress.message || "Failed to save address");

      if (isUpdate) {
        setAddresses(
          addresses.map((addr) =>
            addr._id === savedAddress._id ? savedAddress : addr
          )
        );
      } else {
        setAddresses([...addresses, savedAddress]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Save address error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const response = await fetch(`/api/user/addresses/${addressId}`, {
        method: "DELETE",
      });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-2">
        User Profile
      </h1>

      <section className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong className="block text-gray-500 text-sm">Name:</strong>
            <span className="text-lg text-gray-900">{user?.name || "N/A"}</span>
          </p>
          <p>
            <strong className="block text-gray-500 text-sm">Email:</strong>
            <span className="text-lg text-gray-900">
              {user?.email || "N/A"}
            </span>
          </p>
        </div>
        <button className="mt-6 px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-150">
          Edit Profile
        </button>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">My Addresses</h2>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-150 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onUpdate={() => handleOpenModal(address)}
                onDelete={handleDeleteAddress}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">No addresses saved yet.</p>
          )}
        </div>
      </section>

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </div>
  );
};

export default Profile;
