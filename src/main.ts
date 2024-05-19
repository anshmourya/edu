import express from 'express';
import 'dotenv/config';
import database from '@config/database';
import cors from 'cors';
import searchRouter from '@routes/search';
import doubtRouter from '@routes/doubt';
import responseHandler from 'service/response';
import userHandler from '@routes/user';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(responseHandler);
app.use('/api/v1', searchRouter);
app.use('/api/v1', doubtRouter);
app.use('/api/v1', userHandler);

database()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${process.env.port || port}!`),
    );
  })
  .catch((err) => {
    console.log(err);
  });
