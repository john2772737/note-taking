const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user.router');

app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://johnregulacion5555:kTe1RLFcpEVHpBFv@cluster0.t1xjjrc.mongodb.net/<your-database-name>?retryWrites=true&w=majority';

app.use('/user',userRouter);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // Start the server
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
