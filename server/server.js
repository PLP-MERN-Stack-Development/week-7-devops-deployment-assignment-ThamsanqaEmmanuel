const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const helmet = require ('helmet');


dotenv.config();

// Connect DB and Start Server
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
 }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Wellcome to my backend!!🥳 It finally works🥹. The struggle was real lol🤣😭.... Thanks for everything Mr Dedan!🫡');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
