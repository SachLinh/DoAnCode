const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const cataController = require("../Controllers/CataController");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../Helper/routerHelper");

router
  .route("/")
  .get(cataController.getAllCata)
  .post(validateBody(schemas.newCataSchema), cataController.newCata);

router
  .route("/:cataID")
  .get(validateParam(schemas.idCata, "cataID"), cataController.getCata)
  .delete(validateParam(schemas.idCata, "cataID"), cataController.deleteCata)
  .put(
    validateParam(schemas.idCata, "cataID"),
    validateBody(schemas.newCataSchema),
    cataController.replaceCata
  )
  .patch(
    validateParam(schemas.idCata, "cataID"),
    validateBody(schemas.newCataOptionSchema),
    cataController.updateCata
  );

module.exports = router;
