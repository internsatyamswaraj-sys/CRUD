// routes/addressRoutes.ts
import type { FastifyInstance } from "fastify";
import * as AddressController from "../controllers/addressController.js";

export default async function addressRoutes(fastify: FastifyInstance) {
  // Get all addresses
  fastify.get(
    "/addresses",
    {
      schema: {
        tags: ["Addresses"],
        summary: "Get all addresses with optional pincode filter",
        querystring: {
          type: "object",
          properties: {
            pincode: { type: "string" },
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                user_id: { type: "number" },
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                pincode: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
              },
            },
          },
        },
      },
    },
    AddressController.getAddresses
  );

  // Get address by ID
  fastify.get(
    "/addresses/:id",
    {
      schema: {
        tags: ["Addresses"],
        summary: "Get address by ID",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    AddressController.getAddressById
  );

  // Create address
  fastify.post(
    "/addresses",
    {
      schema: {
        tags: ["Addresses"],
        summary: "Create a new address",
        body: {
          type: "object",
          required: ["user_id", "street", "city", "state", "pincode"],
          properties: {
            user_id: { type: "number" },
            street: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            pincode: { type: "string" },
          },
        },
      },
    },
    AddressController.createAddress
  );

  // Update address
  fastify.put(
    "/addresses/:id",
    {
      schema: {
        tags: ["Addresses"],
        summary: "Update address by ID",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
        body: {
          type: "object",
          properties: {
            user_id: { type: "number" },
            street: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            pincode: { type: "string" },
          },
        },
      },
    },
    AddressController.updateAddress
  );

  // Delete address
  fastify.delete(
    "/addresses/:id",
    {
      schema: {
        tags: ["Addresses"],
        summary: "Delete address by ID",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    AddressController.deleteAddress
  );
}
