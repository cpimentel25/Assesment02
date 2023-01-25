import express from 'express';
import configExpress from './config/express';
import logger from './logger';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Setup express
configExpress(app);

// Connect to MongoDB

// Setup Routs


app.listen(PORT, () => {
  logger.info('Server is running on port 8080');
});
