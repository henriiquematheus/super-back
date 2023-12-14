const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para criar um produto
router.post('/products', productController.createProduct);

// Rota para listar todos os produtos
router.get('/products', productController.getAllProducts);

// Rota para atualizar um produto
router.put('/products/:id', productController.updateProduct);

// Rota para remover um produto
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
