require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoute');

const app = express();
connectDB(process.env.MONGO_URI);
//middleware
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', paymentRoutes);
app.get('/', (req, res) => {
    res.send('API is running ... ');
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})