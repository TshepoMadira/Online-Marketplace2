
const express = require('express');
const router = express.Router();
const { loginUser, registerUser,addProduct, listProducts, updateProduct, deleteProduct } = require('../Controllers/productController');


router.post('/api/products/login', loginUser);
router.post('/api/products/register', registerUser);

router.post('/add', addProduct);


router.get('/', listProducts);


router.put('/update/:id', updateProduct);


router.delete('/delete/:id', deleteProduct);

module.exports = router;
