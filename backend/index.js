const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');



const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/LibrarySystem', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
