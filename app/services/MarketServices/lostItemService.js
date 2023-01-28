import prisma from '../../config/prisma.js';

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

const getFoundItems = async (email) => {
  try {
    const found_items = await prisma.lost_items.findMany({
      where: {
        found: true,
        owner: email,
      },
    });
    return found_items;
  } catch (error) {
    return error;
  }
};

const createMessage = async (message_data) => {
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

    if (reply_to != 0) {
      await prisma.messages.update({
        where: {
          message_id: reply_to,
        },
        data: {
          replies: { increment: 1 },
        },
      });
    }

    return msg;
  } catch (error) {
    return 'Error posting message';
  }
};

const getThread = async (item_id) => {
  try {
    const thread = await prisma.messages.findMany({
      where: {
        OR: [{ reply_to: 0 }, { reply_to: null }],
        item_id: item_id,
      },
    });
    return thread;
  } catch (error) {
    return 'Could not load thread';
  }
};

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

const updateLostItem = async (item_data, item_id) => {
  try {
    const product = await prisma.lost_items.update({
      where: {
        item_id: item_id,
      },
      data: item_data,
    });
    return product;
  } catch (error) {
    return 'Error prcoessing request';
  }
};

const deleteLostItem = async (item_id) => {
  try {
    const lost_item = await prisma.lost_items.delete({
      where: {
        item_id: item_id,
      },
    });
    return lost_item;
  } catch (error) {
    return 'Error removing product';
  }
};

const updateMessage = async (message_id, text) => {
  try {
    const message = await prisma.messages.update({
      where: {
        message_id: message_id,
      },
      data: {
        text: text,
      },
    });
    return message;
  } catch (error) {
    return error;
  }
};

export default {
  createLostItem,
  getLostItem,
  getLostItems,
  getMyLostItems,
  createMessage,
  getReplies,
  getThread,
  updateLostItem,
  deleteLostItem,
  getFoundItems,
  updateMessage,
};
