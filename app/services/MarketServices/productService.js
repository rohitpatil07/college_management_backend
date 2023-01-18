import prisma from '../../config/prisma.js';

const getProducts = async () => {
  try {
    const products = await prisma.products.findMany();
    return products;
  } catch (error) {
    return 'Error processing your request';
  }
};

const getProduct = async (product_id) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        product_id: product_id,
      },
    });
    return product;
  } catch (error) {
    return 'Error processing your request';
  }
};

const getMyProducts = async (owner) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        owner: owner,
      },
    });
    return product;
  } catch (error) {
    return 'Error processing your request';
  }
};

const createProduct = async (product_data) => {
  try {
    const product = await prisma.products.create({
      data: product_data,
    });
    return product;
  } catch (error) {
    return 'Error creating the product';
  }
};

const buyProduct = async (buyer_data) => {
  try {
    const { buyer, buyer_role, product_id } = buyer_data;
    const sale = await prisma.sales.create({
      data: {
        buyer: buyer,
        buyer_role: buyer_role,
        sold_at: new Date(),
        product: {
          connect: {
            product_id: product_id,
          },
        },
      },
    });
    return sale;
  } catch (error) {
    return 'Cannot close the transaction';
  }
};

const getTransactions = async (email) => {
  try {
    const transactions = await prisma.sales.findMany({
      where: {
        OR: [
          { buyer: { equals: email } },
          { product: { owner: { equals: email } } },
        ],
      },
    });
    return transactions;
  } catch (error) {
    return error;
  }
};

const getLostItems = async () => {
  try {
    const lost_items = await prisma.lost_items.findMany();
    return lost_items;
  } catch (error) {
    return 'Error processing your request';
  }
};

const getLostItem = async (item_id) => {
  try {
    const lost_item = await prisma.lost_items.findMany({
      where: {
        item_id: item_id,
      },
    });
    return lost_item;
  } catch (error) {
    return 'Error processing your request';
  }
};

const getMyLostItems = async (owner) => {
  try {
    const lost_items = await prisma.lost_items.findMany({
      where: {
        owner: owner,
      },
    });
    return lost_items;
  } catch (error) {
    return 'Error processing your request';
  }
};

const createLostItem = async (item_data) => {
  try {
    const product = await prisma.lost_items.create({
      data: item_data,
    });
    return product;
  } catch (error) {
    return 'Error creating the item';
  }
};

const message = async (message_data) => {
  try {
    const { reply_to, text, email, item_id } = message_data;
    const msg = await prisma.messages.create({
      data: {
        reply_to: reply_to,
        text: text,
        email: email,
        lost_item: {
          connect: {
            item_id: item_id,
          },
        },
      },
    });
    return msg;
  } catch (error) {
    return 'Error posting message';
  }
};

// const getThread = async();

const getReplies = async (message_id) => {
  try {
    const replies = await prisma.messages.findMany({
      where: {
        reply_to: message_id,
      },
    });
    return replies;
  } catch (error) {
    return 'Error getting replies';
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  buyProduct,
  getMyProducts,
  getTransactions,
  createLostItem,
  getLostItem,
  getLostItems,
  getMyLostItems,
  message,
  getReplies,
};
