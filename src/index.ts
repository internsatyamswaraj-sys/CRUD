import Fastify from "fastify";
import dotenv from "dotenv";

// ✅ correct import based on your setup
import sequelize from "./config/database.js"; 
// import userRoutes from "./routes/userRoutes.js";
// import addressRoutes from "./routes/addressRoutes.js";
import swaggerConfig from "./config/swagger.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = Fastify({ logger: true });

const start = async () => {
  try {
    // ✅ Register Swagger before routes
    await swaggerConfig(app);

    // ✅ Register routes
    app.register(userRoutes);
    app.register(addressRoutes);

    // ✅ Database
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // ⚠️ use migrations in production

    // ✅ Start server
    await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
    app.log.info(`🚀 Server running at http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
