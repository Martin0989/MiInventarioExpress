const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    console.log('La aplicación continuará ejecutándose. Verifica MongoDB antes de usar el CRUD.');
  }
};

module.exports = connectDB;