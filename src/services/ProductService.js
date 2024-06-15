const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const Product = require("../models/ProductModel.js");

dotenv.config();
const findAllProduct = (req) => {
  const query = req?.query;
  return new Promise(async (resolve, reject) => {
    const result = await Product.find(query);

    resolve({
      message: "OK",
      result: result,
    });
  });
};

const createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    const result = await Product.create(body);

    resolve({
      message: "OK",
      result,
    });
  });
};

const paginate = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = req?.query;
    console.log(query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const products = await Product.find(query);
    const totalProducts = products.length;
    if (endIndex < totalProducts) {
      result.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }
    result.result = products.slice(startIndex, endIndex);
    resolve({
      message: "OK",
      result,
    });
  });
};

module.exports = {
  findAllProduct,
  createProduct,
  paginate,
};
