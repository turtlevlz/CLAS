import express from "express";
import authRoutes from "./routes/authRoutes";
import empresaRoutes from "./routes/empresaRoutes";
import rubroRoutes from "./routes/rubroRoutes"
import certificacionRoutes from "./routes/certificacionRoutes";
import membresiaRoutes from "./routes/membresiaRoutes";
import tipoOrganizacionRoutes from "./routes/tipoOrganizacionRoutes";
import funcionContactoRoutes from "./routes/funcionContactoRoutes";
import roleRoutes from "./routes/roleRoutes";
import contactoRoutes from "./routes/contactoRoutes"
import userRoutes from "./routes/userRoutes"
import empresaCertificacionRoutes from "./routes/empresaCertificacionRoutes"
import empresaRubroRoutes from "./routes/empresaRubroRoutes"

const app = express();

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("CLAS API running");
});

app.use("/auth", authRoutes)

app.use("/empresas", empresaRoutes);

app.use("/rubros", rubroRoutes);

app.use("/certificaciones", certificacionRoutes);

app.use("/membresias", membresiaRoutes);

app.use("/organizaciones", tipoOrganizacionRoutes);

app.use("/funciones", funcionContactoRoutes);

app.use("/roles", roleRoutes);

app.use("/contactos", contactoRoutes);

app.use("/usuarios", userRoutes);

app.use("/empresa-certificaciones", empresaCertificacionRoutes)

app.use("/empresa-rubros", empresaRubroRoutes)

export default app;
