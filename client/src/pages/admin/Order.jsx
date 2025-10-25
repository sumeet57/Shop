import React, { useState, useEffect, useCallback } from "react";
import {
  Package2,
  CheckCircle,
  Clock,
  Plane,
  Truck,
  XCircle,
  ChevronDown,
  ListOrdered,
  Loader2,
  Filter,
  User,
  Package,
  Phone,
  Mail,
  DollarSign,
  MonitorPlay,
  Calendar,
} from "lucide-react";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${backendURL}/api/admin/orders`;

const statusOptions = [
  "confirmed",
  "making",
  "shipped",
  "delivered",
  "cancelled",
];

const getStatusDetails = (status) => {
  switch (status) {
    case "confirmed":
      return {
        text: "Confirmed",
        icon: CheckCircle,
        color: "text-blue-400 bg-blue-900/50",
        border: "border-blue-700",
      };
    case "making":
      return {
        text: "In Production",
        icon: Clock,
        color: "text-yellow-400 bg-yellow-900/50",
        border: "border-yellow-700",
      };
    case "shipped":
      return {
        text: "Shipped",
        icon: Truck,
        color: "text-indigo-400 bg-indigo-900/50",
        border: "border-indigo-700",
      };
    case "delivered":
      return {
        text: "Delivered",
        icon: Plane,
        color: "text-green-400 bg-green-900/50",
        border: "border-green-700",
      };
    case "cancelled":
      return {
        text: "Cancelled",
        icon: XCircle,
        color: "text-red-400 bg-red-900/50",
        border: "border-red-700",
      };
    default:
      return {
        text: "Unknown",
        icon: ListOrdered,
        color: "text-zinc-400 bg-zinc-700/50",
        border: "border-zinc-700",
      };
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const StatusBadge = React.memo(({ status }) => {
  const { text, icon: Icon, color, border } = getStatusDetails(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${color} ${border}`}
    >
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
});

const StatusDropdown = ({
  currentStatus,
  orderId,
  onStatusChange,
  disabled,
}) => {
  const { color } = getStatusDetails(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setIsUpdating(true);
    await onStatusChange(orderId, newStatus);
    setIsUpdating(false);
  };

  return (
    <div className="relative inline-block w-full">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`appearance-none block w-full py-2 pl-3 pr-8 text-sm leading-tight text-white rounded-lg transition duration-150 ease-in-out cursor-pointer shadow-inner bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 ${color}`}
        disabled={disabled || isUpdating}
      >
        {statusOptions.map((status) => (
          <option
            key={status}
            value={status}
            className="bg-zinc-800 text-white capitalize"
          >
            {status}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value, isMonospace = false }) => (
  <div className="flex justify-between items-center border-b border-zinc-700 pb-2">
    <span className="text-zinc-400 text-sm font-medium flex items-center gap-2">
      <Icon className="w-4 h-4 text-indigo-400" />
      {label}:
    </span>
    <span
      className={`text-white text-sm text-right ${
        isMonospace ? "font-mono text-xs" : ""
      }`}
    >
      {value || "N/A"}
    </span>
  </div>
);

const DetailModal = ({ isOpen, type, data, onClose }) => {
  if (!isOpen || !data) return null;

  let title = "";
  let content;

  if (type === "user") {
    title = "Customer Details";
    content = (
      <div className="space-y-3">
        <DetailItem icon={User} label="Name" value={data.name} />
        <DetailItem icon={Phone} label="Phone" value={data.phone} />
        <DetailItem icon={Package2} label="Role" value={data.role} />
        <DetailItem
          icon={Calendar}
          label="Member Since"
          value={new Date(data.createdAt).toLocaleDateString()}
        />
        <DetailItem
          icon={ListOrdered}
          label="User ID"
          value={data._id}
          isMonospace={true}
        />
      </div>
    );
  } else if (type === "product") {
    title = "Product Details";
    content = (
      <div className="space-y-3">
        <div className="flex justify-center mb-4">
          <img
            src={
              data.imageUrl ||
              "https://placehold.co/150x150/1f2937/d1d5db?text=No+Image"
            }
            alt={data.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/1f2937/d1d5db?text=No+Image";
            }}
            className="w-full max-w-xs h-auto object-cover rounded-lg border border-zinc-700"
          />
        </div>
        <DetailItem icon={Package} label="Name" value={data.name} />
        <DetailItem
          icon={DollarSign}
          label="Price"
          value={formatCurrency(data.price)}
        />
        <DetailItem icon={Filter} label="Category" value={data.category} />
        <DetailItem
          icon={MonitorPlay}
          label="Context"
          value={data.projectContext}
        />
      </div>
    );
  } else {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center border-b border-indigo-500 pb-3 mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onStatusChange, disabled, openModal }) => {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-zinc-800 rounded-xl p-5 shadow-xl transition duration-300 hover:shadow-2xl hover:border-indigo-500 border border-transparent">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white truncate max-w-[70%]">
          {order.product.name}
        </h3>
        <StatusBadge status={order.status} />
      </div>

      <div className="flex justify-between items-center text-sm text-zinc-400 mb-4 border-b border-zinc-700 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("user", order.user)}
            className="flex items-center gap-1 text-sm text-zinc-300 hover:text-indigo-400 transition"
            title="View Customer Details"
          >
            <User className="w-4 h-4" />
            <span className="truncate max-w-[100px]">
              {order.user.name || "Unknown User"}
            </span>
          </button>
        </div>

        <button
          onClick={() => openModal("product", order.product)}
          className="flex items-center gap-1 text-sm text-zinc-300 hover:text-indigo-400 transition p-1 rounded-full bg-zinc-700 hover:bg-zinc-600"
          title="View Product Details"
        >
          <Package className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 text-sm text-zinc-400 pt-1 mb-4">
        <p className="flex justify-between">
          <span className="font-medium text-zinc-300">Order ID:</span>
          <span className="font-mono text-xs text-indigo-400">{order._id}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium text-zinc-300">Amount:</span>
          <span className="font-bold text-green-400">
            {formatCurrency(order.amount)}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium text-zinc-300">Station:</span>
          {order.selectedStation}
        </p>
        <p className="flex justify-between">
          <span className="font-medium text-zinc-300">Order Date:</span>
          {date}
        </p>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Update Status
        </label>
        <StatusDropdown
          currentStatus={order.status}
          orderId={order._id}
          onStatusChange={onStatusChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("confirmed");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'user' or 'product'
  const [modalData, setModalData] = useState(null);

  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalData(null);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const sortedOrders = data.sort((a, b) => {
        const priority = {
          confirmed: 5,
          making: 4,
          shipped: 3,
          delivered: 2,
          cancelled: 1,
        };
        return priority[b.status] - priority[a.status];
      });

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Check API connection.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      fetchOrders();
    } catch (err) {
      console.error(`Error updating order ${orderId} status:`, err);
      setError(`Failed to update status for ${orderId}.`);
      fetchOrders();
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  const totalOrders = orders.length;

  return (
    <div className="min-h-screen text-zinc-100 font-[Inter] p-4 sm:p-8">
      <header className="flex items-center justify-between border-b border-zinc-800 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3 text-white">
          <Package2 className="w-8 h-8 text-indigo-400" />
          Admin Order Center
        </h1>
        <p className="text-sm text-zinc-400 hidden sm:block">
          Total Orders:{" "}
          <span className="font-bold text-indigo-400">{totalOrders}</span>
        </p>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-300">
          <ListOrdered className="w-5 h-5" />
          Order List ({filteredOrders.length})
        </h2>

        <div className="relative w-full sm:w-56">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none block w-full py-2 pl-3 pr-10 text-sm leading-tight text-white rounded-lg transition duration-150 ease-in-out cursor-pointer shadow-inner bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses ({orders.length})</option>
            {statusOptions.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status} ({orders.filter((o) => o.status === status).length})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
            <Filter className="w-4 h-4" />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
          <p className="mt-4 text-lg text-zinc-400">Fetching orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-zinc-800/50 rounded-xl">
          <ListOrdered className="w-10 h-10 mx-auto text-zinc-500 mb-4" />
          <p className="text-xl text-zinc-400">
            No orders found for this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusChange={updateOrderStatus}
              disabled={isUpdating}
              openModal={openModal}
            />
          ))}
        </div>
      )}

      {isUpdating && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 text-sm z-50">
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving status...
        </div>
      )}

      <DetailModal
        isOpen={modalOpen}
        type={modalType}
        data={modalData}
        onClose={closeModal}
      />
    </div>
  );
};

export default Order;
