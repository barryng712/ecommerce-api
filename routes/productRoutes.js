const express = require('express');

const {getProducts, getProductById, createProduct} = require('../controllers/productController');
const {protect} =require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;