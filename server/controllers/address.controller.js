import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  const userId = req.userId;
  const { address, city, state, country, pinCode } = req.body;

  // user can have maximum 5 addresses
  const existingAddresses = await Address.find({ user: userId });
  if (existingAddresses.length >= 5) {
    return res
      .status(400)
      .json({ message: "You can add a maximum of 5 addresses." });
  }

  try {
    const newAddress = new Address({
      user: userId,
      address,
      city,
      state,
      country,
      pinCode,
    });
    await newAddress.save();

    // get all addresses of user
    const userAddresses = await Address.find({ user: userId });
    res.status(201).json({
      message: "Address added successfully",
      userAddresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding address." });
  }
};

export const getAddresses = async (req, res) => {
  const userId = req.userId;
  try {
    const addresses = await Address.find({ user: userId });
    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching addresses." });
  }
};

export const updateAddress = async (req, res) => {
  const userId = req.userId;
  const addressId = req.params.id;
  const { address, city, state, country, pinCode } = req.body;

  try {
    const existingAddress = await Address.findOne({
      _id: addressId,
      user: userId,
    });
    if (!existingAddress) {
      return res.status(404).json({ message: "Address not found." });
    }
    existingAddress.address = address;
    existingAddress.city = city;
    existingAddress.state = state;
    existingAddress.country = country;
    existingAddress.pinCode = pinCode;
    await existingAddress.save();
    const userAddresses = await Address.find({ user: userId });
    res.status(200).json({
      message: "Address updated successfully",
      userAddresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating address." });
  }
};

export const deleteAddress = async (req, res) => {
  const userId = req.userId;
  const addressId = req.params.id;
  try {
    const existingAddress = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });
    if (!existingAddress) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting address." });
  }
};
