const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Um exemplo mínimo de comprimento da senha
  },
  tokens: [{ token: { type: String, required: true } }] // Se você armazenar os tokens no usuário
});

// Hash da senha antes de salvar no banco de dados
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Geração do token JWT
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'JWT_SECRET_KEY');
  // You might want to save the token to the user model here
  return token;
};

// Método estático para encontrar usuário por credenciais
userSchema.statics.findByCredentials = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;