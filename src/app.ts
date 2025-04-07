import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import router from './app/Routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app = express();
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
