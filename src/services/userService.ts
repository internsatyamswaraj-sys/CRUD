import User from "../models/User.js";
import Address from "../models/Address.js";

const createUser = async (data: any) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id: number) => {
  return await User.findByPk(id, { include: [{ model: Address, as: "addresses" }] });
};

const updateUser = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return await user.update(data);
};


// const updateUser = async (id: number, data: any) => {
//   const user = await User.findByPk(id);
//   if (!user) throw new Error("User not found");

//   // ✅ sirf bheje gaye fields ko update karega
//   Object.assign(user, data);

//   await user.save();
//   return user;
// };


const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return { message: "User deleted successfully" };
};

const getUsersWithAddresses = async () => {
  return await User.findAll({
    include: [{ model: Address, as: "addresses" }],
  });
};

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersWithAddresses };



