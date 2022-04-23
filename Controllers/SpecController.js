const Product = require("../Models/ProductModel");
const Specification = require("../Models/SpecModel");

const getAllSpecification = async (req, res, next) => {
  const spec = await Specification.find({});
  return res.status(200).json({ spec });
};
const newSpecification = async (req, res, next) => {
  const newSpec = new Specification(req.value.body);
  await newSpec.save();
  return res.status(201).json({ newSpec });
};
const getSpecification = async (req, res, next) => {
  const { SpecID } = req.value.params;
  const specification = await Specification.findById(SpecID);
  return res.status(200).json({ specification });
};
const updateSpecification = async (req, res, next) => {
  const { SpecID } = req.value.params;
  const newSpecification = req.value.body;
  const result = await Specification.findByIdAndUpdate(
    SpecID,
    newSpecification
  );
  return res.status(200).json({ success: true });
};
const replaceSpecification = async (req, res, next) => {
  const { SpecID } = req.value.params;
  const newSpecification = req.value.body;
  const result = await Specification.findByIdAndUpdate(
    SpecID,
    newSpecification
  );
  return res.status(200).json({ success: true });
};
const deleteSpecification = async (req, res, next) => {
  const { SpecID } = req.value.params;
  // getSpecification
  const specification = await Specification.findById(SpecID);
  await specification.remove();
  return res.status(200).json({ success: true });
};
module.exports = {
  newSpecification,
  getAllSpecification,
  getSpecification,
  updateSpecification,
  replaceSpecification,
  deleteSpecification,
};
