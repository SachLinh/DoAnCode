const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PromotionController = require("../Controllers/PromotionController");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../Helper/routerHelper");

router
  .route("/")
  .get(PromotionController.getAllPromotion)
  .post(validateBody(schemas.newProSchema), PromotionController.newPromotion);

router
  .route("/:PromotionID")
  .get(
    validateParam(schemas.idPro, "PromotionID"),
    PromotionController.getPromotion
  )
  .delete(
    validateParam(schemas.idPro, "PromotionID"),
    PromotionController.deletePromotion
  )
  .put(
    validateParam(schemas.idPro, "PromotionID"),
    validateBody(schemas.newProSchema),
    PromotionController.replacePromotion
  )
  .patch(
    validateParam(schemas.idPro, "PromotionID"),
    validateBody(schemas.newProOptionSchema),
    PromotionController.updatePromotion
  );

module.exports = router;
