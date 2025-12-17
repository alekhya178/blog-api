import express from "express";
import sequelize from "./config/database.js";
import "./models/Author.js";
import "./models/Post.js";
import authorRoutes from "./routes/authorRoutes.js";
import postRoutes from "./routes/postRoutes.js";


const app = express();

const startServer = async () => {
  try {
    // Middleware
    app.use(express.json());

    // Routes
    app.use("/authors", authorRoutes);

    app.use("/posts", postRoutes);


    // Test route
    app.get("/", (req, res) => {
      res.send("Blog API is running");
    });

    // DB connection
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");

    // Sync tables
    await sequelize.sync({ alter: true });
    console.log("All tables synced successfully");

    // Start server
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
