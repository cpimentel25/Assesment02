import mongoose from 'mongoose';
import logger from '../logger';

async function connectDB() {
  const uri = process.env.MONGO_DB_URI;

  if (!uri) {
    throw new Error('MONGO_DB_URI no se encuentra definido');
  }

  try {
    await mongoose.connect(uri);
    logger.info('Conectado a la base de datos');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDB;
