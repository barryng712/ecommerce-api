const Stripe = require('stripe')

const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const createPayment = async (req,res)=>{
    try{
        const cart = await Cart.findOne({user: req.user._id}).populate('products.product');
        
        if (!cart || cart.products.length === 0){
            return res.status(400).json({mesage: 'cart is empty'});
        }

        const totalAmount = cart.products.reduce((acc, item) =>{
            return acc + item.product.price * item.quantity;
        }, 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({message: 'payment successfully'})
    }catch(error){
        console.error('error creating payment intent: ', error);
        res.status(500).json({message: 'payment initiation failed'});
    }
};

module.exports = {createPayment};