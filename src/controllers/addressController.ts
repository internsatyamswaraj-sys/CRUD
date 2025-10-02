import type { FastifyReply, FastifyRequest } from "fastify";
import addressService from "../services/addressService.js"; 

export const createAddress = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const address = await addressService.createAddress(req.body);
    reply.code(201).send(address);
  } catch (err) {
    reply.code(400).send({ error: (err as Error).message });
  }
};

export const getAddresses = async (
  req: FastifyRequest<{ Querystring: { pincode?: string } }>,
  reply: FastifyReply
) => {
  const addresses = await addressService.getAllAddresses(req.query.pincode);
  reply.send(addresses);
};

export const getAddressById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const address = await addressService.getAddressById(Number(req.params.id));
  if (!address) return reply.code(404).send({ error: "Address not found" });
  reply.send(address);
};

export const updateAddress = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const address = await addressService.updateAddress(Number(req.params.id), req.body);
    reply.send(address);
  } catch (err) {
    reply.code(404).send({ error: (err as Error).message });
  }
};

export const deleteAddress = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const res = await addressService.deleteAddress(Number(req.params.id));
    reply.send(res);
  } catch (err) {
    reply.code(404).send({ error: (err as Error).message });
  }
};
