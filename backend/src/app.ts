import express from "express";
import authRoutes from "./routes/authRoutes";
import empresaRoutes from "./routes/empresaRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CLAS API running");
});

app.use("/auth", authRoutes)

app.use("/empresas", empresaRoutes);


export default app;
