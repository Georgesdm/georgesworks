const express = require("express");
const projectController = require("../controllers/projectsControllers");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const { upload, optimizeImage } = require("../middlewares/multer-config");

router.get("/", projectController.getAllProjects);
router.post(
  "/",
  upload.single("image"),
  optimizeImage,
  projectController.createProject
);
router.get("/:id", projectController.getOneProject);
router.put("/:id", authenticateToken, projectController.updateProject);
router.delete("/:id", authenticateToken, projectController.deleteProject);

module.exports = router;
