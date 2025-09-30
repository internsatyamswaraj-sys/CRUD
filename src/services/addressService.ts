import Address from "../models/Address.js";
import User from "../models/User.js";

const createAddress = async (data: any) => {
  const user = await User.findByPk(data.user_id);
  if (!user) throw new Error("User not found");
  return await Address.create(data);
};

const getAllAddresses = async (pincode?: string) => {
  const where = pincode ? { pincode } : {};
  return await Address.findAll({ where });
};

const getAddressById = async (id: number) => {
  return await Address.findByPk(id, { include: [{ model: User, as: "user" }] });
};

const updateAddress = async (id: number, data: any) => {
  const address = await Address.findByPk(id);
  if (!address) throw new Error("Address not found");
  return await address.update(data);
};

const deleteAddress = async (id: number) => {
  const address = await Address.findByPk(id);
  if (!address) throw new Error("Address not found");
  await address.destroy();
  return { message: "Address deleted successfully" };
};

export default { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress };
