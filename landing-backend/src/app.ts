import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // rotas dentro de routes
app.use("/api/dashboard", dashboardRoutes); // novo: dashboard

app.get("/", (req, res) => {
  res.json({
    message: "Deepin backend running 🚀"
  });
});

export default app;