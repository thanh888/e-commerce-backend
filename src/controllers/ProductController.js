const productService = require("../services/ProductService");

const findAllProduct = async (req, res) => {
  const result = await productService.findAllProduct(req);
  return res.status(200).json({ result });
};
const findOneProduct = async (req, res) => {
  const body = req.body;

  // const result = await productService.createProduct(body);

  return res.status(200).json({ result });
};
const createProduct = async (req, res) => {
  const result = await productService.createProduct(req.body);

  return res.status(200).json(result);
};
const updateProduct = async (req, res) => {};
const hardDeleteProduct = async (req, res) => {};
const paginate = async (req, res) => {
  const result = await productService.paginate(req);

  return res.status(200).json(result);
};

module.exports = {
  findAllProduct,
  findOneProduct,
  createProduct,
  updateProduct,
  hardDeleteProduct,
  paginate,
};
