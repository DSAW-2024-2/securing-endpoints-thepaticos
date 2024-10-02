const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require("../routes/users");
const productRoutes = require("../routes/products");
const orderRoutes = require("../routes/orders");
const loginRouter = require("../routes/login");
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");

app.use("/users", cookieJwtAuth, userRoutes);
app.use("/products", cookieJwtAuth, productRoutes);
app.use("/orders", cookieJwtAuth, orderRoutes);
app.use("/login", loginRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
