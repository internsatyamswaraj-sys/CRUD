// ✅ type-only import
import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default async function swaggerConfig(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "CRUD API",
        description: "Fastify + Sequelize + MySQL",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
}
