const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.post("/api/category", categoryController.createCategory);
router.get("/api/category", categoryController.getAllCategory);
router.get("/api/category/:id", categoryController.getSingleCategory);
router.put("/api/category/:id", categoryController.updateCategory);
router.delete("/api/category/:id", categoryController.deleteCategory);

module.exports = router;
