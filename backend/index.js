const express = require("express");   // Import Express
const mongoose = require("mongoose"); // Import Mongoose
const cors = require("cors");         // Import CORS
const dotenv = require("dotenv");     // Import dotenv

// Import Rotas
const compras = require('./routes/compra');
const fornecedores = require('./routes/fornecedor');
const produtos = require('./routes/produto');
const tranferencias = require('./routes/transferencia');
const vendas = require('./routes/venda');
const auth = require("./routes/auth");


dotenv.config();

const app = express(); // Create an Express app


// Middleware to parse JSON requests
app.use(express.json());
// Middlewarte CORS
app.use(cors);

// Connect to moongose
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Define a test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Server port and Start Server
const PORT = process.env.PORT || 3000; // Define the port your server will run on
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Rotas
app.use("/api/compras", compras);
app.use("/api/fornecedores", fornecedores);
app.use("/api/produtos", produtos);
app.use("/api/tranferencias", tranferencias);
app.use("/api/vendas", vendas);
//app.use("/auth", auth);
