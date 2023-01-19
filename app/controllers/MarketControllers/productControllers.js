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
    const { product_id } = req.body;
    const products = await productService.getProduct(product_id);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { product } = req.body;
    const created_product = await productService.createProduct(product);
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

const getLostItems = async (req, res) => {
  try {
    const products = await productService.getLostItems();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getMyLostItems = async (req, res) => {
  try {
    const { owner } = req.body;
    const lost_items = await productService.getMyLostItems(owner);
    res.json(lost_items);
  } catch (error) {
    res.json(error);
  }
};

const getLostItem = async (req, res) => {
  try {
    const { item_id } = req.body;
    const lost_item = await productService.getLostItem(item_id);
    res.json(lost_item);
  } catch (error) {
    res.json(error);
  }
};

const createLostItem = async (req, res) => {
  try {
    const { lost_item } = req.body;
    const my_lost_item = await productService.createLostItem(lost_item);
    res.json(my_lost_item);
  } catch (error) {
    res.json(error);
  }
};

const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const message_data = await productService.createMessage(message);
    res.json(message_data);
  } catch (error) {
    res.json(error);
  }
};

const getThread = async (req, res) => {
  try {
    const { item_id } = req.body;
    const thread = await productService.getThread(item_id);
    res.json(thread);
  } catch (error) {
    res.json(error);
  }
};

const getReplies = async (req, res) => {
  try {
    const { message_id } = req.body;
    const replies = await productService.getReplies(message_id);
    res.json(replies);
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
  getLostItem,
  getLostItems,
  getMyLostItems,
  createLostItem,
  createMessage,
  getThread,
  getReplies,
};
