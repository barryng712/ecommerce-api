const express = require('express');

const {addItemToCart, removeItemFromCart} = require('../controllers/cartController');
const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', protect, addItemToCart);
router.post('/remove', protect, removeItemFromCart);

module.exports = router;