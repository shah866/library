const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

////////////////////////

const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/LibrarySystem', {  useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Any requests to /api/auth will be handled by the routes defined in userRoutes.
app.use('/api/auth', userRoutes);

app.use('/api/books', bookRoutes);
app.use('/api/students', studentRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



