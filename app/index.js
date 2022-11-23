import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './config/index.js';
import routes from './routes/index.js';

const startServer = () => {
  const app = express();

  const PORT = config.PORT || 5000;

  app.use(helmet());

  app.use(fileUpload());
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);

  app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
  });
  return app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`),
  );
};

export { startServer };
