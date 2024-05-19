import express from 'express';
import 'dotenv/config';
import { youtube } from '@config/youtube';
import database from '@config/database';
import { YoutubeTranscript } from 'youtube-transcript';
import cors from 'cors';
import searchRouter from '@routes/search';
import doubtRouter from '@routes/doubt';
import responseHandler from 'service/response';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(responseHandler);
app.use('/api/v1', searchRouter);
app.use('/api/v1', doubtRouter);

app.get('/', async (req, res) => {
  const data = await youtube.videos.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    id: ['NJhnXQ6tYhc'],
  });
  YoutubeTranscript.fetchTranscript(
    'https://www.youtube.com/watch?v=NJhnXQ6tYhc',
  ).then(console.log);
  res.send(data);
});
database()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${process.env.port || port}!`),
    );
  })
  .catch((err) => {
    console.log(err);
  });
