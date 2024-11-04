const express = require('express');
const router = express.Router();
const { registerUser, loginUser, addProduct, updateProduct, deleteProduct, listProducts } = require('../Controllers/customerController');


router.post('/register', registerUser);
router.post('/login', loginUser);


router.post('/products', addProduct);
router.get('/products', listProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
