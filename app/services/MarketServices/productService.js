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

const getProductsByName = async (pname) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        product_name: { contains: pname },
      },
    });
    return products;
  } catch (error) {
    return 'Error processing your request';
  }
};

const getProductsByCategory = async (category) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        category: category,
      },
    });
    return products;
  } catch (error) {
    return 'Error processing your request';
  }
};

const updateProduct = async (product_data, product_id) => {
  try {
    const product = await prisma.products.update({
      where: {
        product_id: product_id,
      },
      data: product_data,
    });
    return product;
  } catch (error) {
    return 'Error prcoessing request';
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  buyProduct,
  getMyProducts,
  getTransactions,
  getProductsByCategory,
  getProductsByName,
  updateProduct,
};
