import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../services/userService.js"; 

export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await userService.createUser(req.body);
    reply.code(201).send(user);
  } catch (err) {
    reply.code(400).send({ error: (err as Error).message });
  }
};

export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.getAllUsers();
  reply.send(users);
};

export const getUserById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return reply.code(404).send({ error: "User not found" });
  reply.send(user);
};

export const updateUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    reply.send(user);
  } catch (err) {
    reply.code(404).send({ error: (err as Error).message });
  }
};

export const deleteUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const res = await userService.deleteUser(Number(req.params.id));
    reply.send(res);
  } catch (err) {
    reply.code(404).send({ error: (err as Error).message });
  }
};

export const getUsersWithAddresses = async (_req: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.getUsersWithAddresses();
  reply.send(users);
};
