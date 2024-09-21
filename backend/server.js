require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const skillsRoutes = require("./src/routes/skills");
const projectsRoutes = require("./src/routes/projects");
const path = require("path");
const { mongoose } = require("./src/database/mongo"); // Connexion à MongoDB

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ["https://georgesworks.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("Path to uploads:", path.join(__dirname, "uploads"));

// Route de test pour s'assurer que le serveur fonctionne
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
