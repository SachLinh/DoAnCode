/** @format */

const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const SpecController = require('../Controllers/SpecController');
const {
	validateBody,
	schemas,
	validateParam,
} = require('../Helper/routerHelper');

router
	.route('/')
	.get(SpecController.getAllSpecification)
	.post(validateBody(schemas.newSpecSchema), SpecController.newSpecification);

router
	.route('/:SpecID')
	.get(
		validateParam(schemas.idSpec, 'SpecID'),
		SpecController.getSpecification,
	)
	.delete(
		validateParam(schemas.idSpec, 'SpecID'),
		SpecController.deleteSpecification,
	)
	.put(
		validateParam(schemas.idSpec, 'SpecID'),
		validateBody(schemas.newSpecOptionSchema),
		SpecController.replaceSpecification,
	)
	.patch(
		validateParam(schemas.idSpec, 'SpecID'),
		validateBody(schemas.newSpecOptionSchema),
		SpecController.updateSpecification,
	);

module.exports = router;
