import lostItemService from '../../services/MarketServices/lostItemService.js';

const getLostItems = async (req, res) => {
  try {
    const products = await lostItemService.getLostItems();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getMyLostItems = async (req, res) => {
  try {
    const { owner } = req.body;
    const lost_items = await lostItemService.getMyLostItems(owner);
    res.json(lost_items);
  } catch (error) {
    res.json(error);
  }
};

const getLostItem = async (req, res) => {
  try {
    const { item_id } = req.body;
    const lost_item = await lostItemService.getLostItem(item_id);
    res.json(lost_item);
  } catch (error) {
    res.json(error);
  }
};

const createLostItem = async (req, res) => {
  try {
    const { lost_item } = req.body;
    const my_lost_item = await lostItemService.createLostItem(lost_item);
    res.json(my_lost_item);
  } catch (error) {
    res.json(error);
  }
};

const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const message_data = await lostItemService.createMessage(message);
    res.json(message_data);
  } catch (error) {
    res.json(error);
  }
};

const getThread = async (req, res) => {
  try {
    const { item_id } = req.body;
    const thread = await lostItemService.getThread(item_id);
    res.json(thread);
  } catch (error) {
    res.json(error);
  }
};

const getReplies = async (req, res) => {
  try {
    const { message_id } = req.body;
    const replies = await lostItemService.getReplies(message_id);
    res.json(replies);
  } catch (error) {
    res.json(error);
  }
};

export default {
  getLostItem,
  getLostItems,
  getMyLostItems,
  createLostItem,
  createMessage,
  getThread,
  getReplies,
};
