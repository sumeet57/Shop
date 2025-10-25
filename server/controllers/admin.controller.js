import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("product");
    if (!orders) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const validStatuses = [
    "confirmed",
    "making",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json({
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Order status update failed:", error);
    res.status(500).json({
      message: error.message || "Server error while updating order status.",
    });
  }
};
