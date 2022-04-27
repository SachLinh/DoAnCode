const express = require("express");
const router = require("express-promise-router")();
const ProductController = require("../Controllers/ProductController");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../Helper/routerHelper");

router
  .route("/")
  .get(ProductController.getAllProduct)
  .post(validateBody(schemas.newProductSchema), ProductController.newProduct);
router
  .route("/:productID")
  .get(validateParam(schemas.idProduct, 'productID'),ProductController.getProduct)
  .put(validateParam(schemas.idProduct, 'productID'), validateBody(schemas.newProductOptionSchema), ProductController.updateProduct)
  // .patch(validateParam(schemas.idProduct, 'productID'), validateBody(schemas.newProductOptionSchema), ProductController.updateProduct)
  .delete(validateParam(schemas.idProduct, 'productID'),ProductController.deleteProduct);
router.route("/:productID/Specifications").get()
.post(validateParam(schemas.idProduct, 'productID'), validateBody(schemas.newSpecSchema), ProductController.newSpecByProduct);
module.exports = router;