const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");

router.get("/paginate", ProductController.paginate);
router.get("/", ProductController.findAllProduct);
router.get("/:id", ProductController.findOneProduct);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.hardDeleteProduct);

module.exports = router;
