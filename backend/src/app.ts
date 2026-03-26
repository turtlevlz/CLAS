import express from "express";
import authRoutes from "./routes/authRoutes";
import empresaRoutes from "./routes/empresaRoutes";
import rubroRoutes from "./routes/rubroRoutes"
import certificacionRoutes from "./routes/certificacionRoutes";
import membresiaRoutes from "./routes/membresiaRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CLAS API running");
});

app.use("/auth", authRoutes)

app.use("/empresas", empresaRoutes);

app.use("/rubros", rubroRoutes);

app.use("/certificaciones", certificacionRoutes);

app.use ("/membresias", membresiaRoutes);

export default app;
