const Promotion = require("../Models/PromotionModel");
const Cata = require("../Models/CataModel");
const Product = require("../Models/ProductModel");
const Specification = require("../Models/SpecModel");

const getAllProduct = async (req, res, next) => {
  const product = await Product.find({});
  return res.status(200).json({ product });
};
const getProduct = async (req, res, next) => {
  const { productID } = req.value.params;
  const product = await Product.findById(productID);
  return res.status(200).json({ product });
};
const newProduct = async (req, res, next) => {
  // Tìm Cata
  const cata = await Cata.findById(req.value.body.ID_Cata);
  // Tìm Promotion
  const promotion = await Promotion.findById(req.value.body.ID_Promotion);
  // lay data
  const product = req.value.body;
  // Xóa ID_Cata, Xóa ID_Promotion ở product
  delete product.ID_Cata;
  delete product.ID_Promotion;
  // Truyền ID Cata, promotion
  product.ID_Cata = cata._id;
  product.ID_Promotion = promotion._id;
  // save
  const newPro = new Product(product);
  await newPro.save();
  // lưu product vào trong cata, promotion
  cata.products.push(newPro._id);
  promotion.products.push(newPro._id);
  await cata.save();
  await promotion.save();

  return res.status(201).json({ product: newPro });
};
const newSpecByProduct = async (req, res, next) => {
    const {productID} = req.value.params
    // Tao new Spec
    const newSpec = await Specification(req.value.body)
    // get product
    const productOriginal = await Product.findById(productID)
    // dua product vao trong spec
    newSpec.product = productOriginal
    await newSpec.save()
    // dua spec vao trong Product
    productOriginal.ID_Spec = newSpec._id
    await productOriginal.save()
    return res.status(201).json({spec: newSpec})
};

const updateProduct = async (req, res, next) => {
  const { productID } = req.value.params;
  const newProduct = req.value.body;
  const product = await Product.findById(productID);
  // Thay gia tri moi
  const result = await Product.findByIdAndUpdate(productID, newProduct);
  if (newProduct.ID_Cata) {
    // Tim Cata
    const cata = await Cata.findById(product.ID_Cata);
    cata.products.pull(product);
    await cata.save();
    // Thay product moi vao cata
    const newCata = await Cata.findById(newProduct.ID_Cata);
    newCata.products.push(result._id);
    await newCata.save();
  }
  if (newProduct.ID_Promotion) {
    //Tim Promotion
    const promotion = await Promotion.findById(product.ID_Promotion);
    promotion.products.pull(product);
    await promotion.save();
    // Thay product moi vao promotion
    const newPromotion = await Promotion.findById(newProduct.ID_Promotion);
    newPromotion.products.push(result._id);
    await newPromotion.save();
  }

  return res.status(200).json({ success: true });
};
const replaceProduct = async (req, res, next) => {
  const { productID } = req.value.params;
  const product = await Product.findById(productID);
  // Tim Cata, Promotion
  const cata = await Cata.findById(product.ID_Cata);
  const promotion = await Promotion.findById(product.ID_Promotion);
  // xoa gia tri product trong cata, promotion cu
  cata.products.pull(product);
  promotion.products.pull(product);
  await cata.save();
  await promotion.save();
  // Thay gia tri moi
  const newProduct = req.value.body;
  const result = await Product.findByIdAndUpdate(productID, newProduct);
  // Thay product moi vao cata, promotion moi
  const newCata = await Cata.findById(newProduct.ID_Cata);
  const newPromotion = await Promotion.findById(newProduct.ID_Promotion);
  newCata.products.push(result._id);
  newPromotion.products.push(result._id);
  await newCata.save();
  await newPromotion.save();
  return res.status(200).json({ success: true });
};

const deleteProduct = async (req, res, next) => {
    const {productID} = req.value.params
    // get Product
    const product = await Product.findById(productID)
    //Tim specification
    if(product.ID_Spec){
        const specification = await Specification.findById(product.ID_Spec)
        await specification.remove()
    }
    // Tim cata , promotion
    const cata = await Cata.findById(product.ID_Cata)
    cata.products.pull(product)
    await cata.save();
    const promotion = await Promotion.findById(product.ID_Promotion)
    promotion.products.pull(product)
    await promotion.save();

      // delete cata
    await product.remove()
    return res.status(200).json({success:true})
};

module.exports = {
  getAllProduct,
  getProduct,
  newProduct,
  newSpecByProduct,
  updateProduct,
  replaceProduct,
  deleteProduct,
};
