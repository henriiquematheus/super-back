const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body; // Ajuste para aceitar apenas esses campos
    const product = new Product({ name, price, quantity }); // Cria o produto com os campos recebidos
    await product.save();
    res.status(201).json({ product, message: 'Produto criado com sucesso' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({}, 'name price quantity'); // Retorna apenas name, price e quantity
      res.status(200).json({ products, message: 'Todos os produtos listados' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description, image, quantity } = req.body;
  
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price, description, image, quantity },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).send({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ product, message: 'Produto atualizado com sucesso' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).send({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).send({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ product, message: 'Produto encontrado' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  const getProductQuantityById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).send({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ quantity: product.quantity });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };
  
  
  module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductQuantityById,
  };