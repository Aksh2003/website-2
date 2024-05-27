const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
require('dotenv').config();
const app = express();
connectDB();
app.use(cors());


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








