const express = require("express");   // Import Express
const mongoose = require("mongoose"); // Import Mongoose
const cors = require("cors");         // Import CORS
const dotenv = require("dotenv");     // Import dotenv

const apiRoutes = require("./routes/apiRoutes"); 
const authRoute = require("./routes/authRoute");


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

app.use("/api", apiRoutes);
app.use("/auth", authRoute);
