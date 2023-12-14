const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Rota para criar um usuário
router.post('/users', (req, res, next) => {
  console.log('Frontend está acessando a rota de criação de usuário');
  next(); // Chama o próximo middleware (userController.createUser)
}, userController.createUser);

// Rota para login do usuário
router.post('/users/login', (req, res, next) => {
  console.log('Frontend está acessando a rota de login do usuário');
  next(); // Chama o próximo middleware (userController.loginUser)
}, userController.loginUser);

// Rota para logout do usuário
router.post('/users/logout', auth, (req, res, next) => {
  console.log('Frontend está acessando a rota de logout do usuário');
  next(); // Chama o próximo middleware (userController.logoutUser)
}, userController.logoutUser);

module.exports = router;
