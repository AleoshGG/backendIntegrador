require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const patientsRoutes = require("./routes/patients");
const resultsRouter = require("./routes/results");
const analysisRouter = require("./routes/analysis");
const promotionsRouter = require("./routes/promotions");
const salesRouter = require("./routes/sales");
const schedulesRouter = require("./routes/schedules");
const appointmentsRouter = require("./routes/appointments");
const priceRouter = require("./routes/price");
const historyRouter = require("./routes/history");

const app = express();
const port = process.env.PORT;

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

// Usar las rutas de los items
app.use("/users", usersRoutes); //URI
app.use("/patients", patientsRoutes);
app.use("/results", resultsRouter);
app.use("/analysis", analysisRouter);
app.use("/promotions", promotionsRouter);
app.use("/sales", salesRouter);
app.use("/schedules", schedulesRouter);
app.use("/appointments", appointmentsRouter);
app.use("/price", priceRouter);
app.use("/history", historyRouter);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
