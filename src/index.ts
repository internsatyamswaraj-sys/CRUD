import Fastify from "fastify";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import swaggerConfig from "./config/swagger.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = Fastify({ logger: true });

// Register Swagger before routes
await swaggerConfig(app);

// Register routes
app.register(userRoutes);
app.register(addressRoutes);

// Database connection
await sequelize.authenticate();
await sequelize.sync({ alter: true });

// Instead of app.listen, we export handler for Vercel
export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}
