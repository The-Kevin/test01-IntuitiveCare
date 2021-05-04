import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  return res.send('');
});

app.listen( PORT, () => {
  console.log('running!');
});
