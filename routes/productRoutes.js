const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para criar um produto
router.post('/products', productController.createProduct);

// Rota para listar todos os produtos
router.get('/products', productController.getAllProducts);

// Rota para atualizar um produto
router.put('/products/:id', productController.updateProduct);


// Rota para obter um produto por ID
router.get('/products/:id', productController.getProductById);

// Rota para remover um produto
router.delete('/products/:id', productController.deleteProduct);

router.get('/products/quantity/:id', productController.getProductQuantityById);

module.exports = router;
