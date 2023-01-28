import productService from '../../services/MarketServices/productService.js';

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await productService.getProduct(req.body);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_data } = req.body;
    const created_product = await productService.createProduct(product_data);
    res.json(created_product);
  } catch (error) {
    res.json(error);
  }
};

const buyProduct = async (req, res) => {
  try {
    const { buyer } = req.body;
    const bought_product = await productService.buyProduct(buyer);
    res.json(bought_product);
  } catch (error) {
    res.json(error);
  }
};

const getTransactions = async (req, res) => {
  try {
    const { email } = req.body;
    const products = await productService.getTransactions(email);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getProducstByName = async (req, res) => {
  try {
    const { product_name } = req.body;
    const products = await productService.getProductsByName(product_name);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await productService.getProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { product_id, product_data } = req.body;
    const products = await productService.updateProduct(
      product_data,
      product_id,
    );
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    const product = await productService.deleteProduct(product_id);
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  buyProduct,
  getTransactions,
  getProducstByName,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
