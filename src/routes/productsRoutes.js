
const express = require('express');
const router = express.Router();
const { addProduct, listProducts, updateProduct, deleteProduct } = require('../Controllers/productController');


router.post('/add', addProduct);


router.get('/', listProducts);


router.put('/update/:id', updateProduct);


router.delete('/delete/:id', deleteProduct);

module.exports = router;
