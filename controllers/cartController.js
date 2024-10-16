const Cart = require('../models/cartModel')

const addItemToCart = async (req, res) => {
    console.log(req.user);  // Check if this prints the user info

    if (!req.user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const {productId, quantity} = req.body;
    const cart = await Cart.findOne({user: req.user.id});

    if (cart){
        const itemIndex = cart.products.findIndex(p => p.product == productId);

        if (itemIndex > -1){
            cart.products[itemIndex].quantity += quantity;
        }else{
            cart.products.push({product: productId, quantity});
        }

        await cart.save();
        res.json(cart);
    }else{
        const newCart = await Cart.create({
            user: req.user._id,
            products: [{product: productId, quantity}]
        });
        res.status(201).json(newCart);
    }
};

const removeItemFromCart = async (req,res) => {
    const {productId} = req.body;
    const cart = await Cart.findOne({user: req.user._id});
    if(cart){
        cart.products = cart.products.filter(p => p.product != productId);
        await cart.save();
        res.json(cart);
    }else{
        res.status(404).json({message: "cart not found"});
    }
};

module.exports = {addItemToCart, removeItemFromCart};