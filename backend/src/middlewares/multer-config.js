const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage(); // Stocke les fichiers en mémoire

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Erreur : Seules les images sont autorisées");
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

const optimizeImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // Pas d'image, on passe au middleware suivant
  }

  const filename = `${Date.now()}-${req.file.originalname.split(".")[0]}.webp`;
  const outputPath = path.join(__dirname, "../uploads", filename);

  try {
    // Optimiser et convertir l'image en WebP
    await sharp(req.file.buffer)
      .resize(800)
      .webp({ quality: 80 })
      .toFile(outputPath);

    req.body.imageUrl = `/uploads/${filename}`;
    next();
  } catch (error) {
    console.error("Erreur lors de l'optimisation de l'image:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'optimisation de l'image" });
  }
};

module.exports = { upload, optimizeImage };
