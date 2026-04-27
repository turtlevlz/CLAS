import express from "express";
import authRoutes from "./routes/authRoutes";
import empresaRoutes from "./routes/empresaRoutes";
import rubroRoutes from "./routes/rubroRoutes";
import certificacionRoutes from "./routes/certificacionRoutes";
import membresiaRoutes from "./routes/membresiaRoutes";
import tipoOrganizacionRoutes from "./routes/tipoOrganizacionRoutes";
import funcionContactoRoutes from "./routes/funcionContactoRoutes";
import roleRoutes from "./routes/roleRoutes";
import contactoRoutes from "./routes/contactoRoutes";
import userRoutes from "./routes/userRoutes";
import empresaCertificacionRoutes from "./routes/empresaCertificacionRoutes";
import empresaRubroRoutes from "./routes/empresaRubroRoutes";
import industriaRoutes from "./routes/industriaRoutes";
import necesidadRoutes from "./routes/necesidadRoutes";
import productoFabricadoRoutes from "./routes/productoFabricadoRoutes";
import procesoRoutes from "./routes/procesoRoutes";
import empresaIndustriaRoutes from "./routes/empresaIndustriaRoutes";
import empresaNecesidadRoutes from "./routes/empresaNecesidadRoutes";
import empresaProcesoRoutes from "./routes/empresaProcesoRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CLAS API running");
});

app.use("/auth", authRoutes);

app.use("/empresas", empresaRoutes);

app.use("/rubros", rubroRoutes);

app.use("/certificaciones", certificacionRoutes);

app.use("/membresias", membresiaRoutes);

app.use("/organizaciones", tipoOrganizacionRoutes);

app.use("/funciones", funcionContactoRoutes);

app.use("/roles", roleRoutes);

app.use("/contactos", contactoRoutes);

app.use("/usuarios", userRoutes);

app.use("/empresa-certificaciones", empresaCertificacionRoutes);

app.use("/empresa-rubros", empresaRubroRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/industrias", industriaRoutes);

app.use("/necesidades", necesidadRoutes);

app.use("/productos", productoFabricadoRoutes);

app.use("/procesos", procesoRoutes);

app.use("/empresa-industrias", empresaIndustriaRoutes);

app.use("/empresa-necesidades", empresaNecesidadRoutes);

app.use("/empresa-procesos", empresaProcesoRoutes);

export default app;
