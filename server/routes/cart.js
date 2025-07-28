const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authenticateToken');

// All routes protected
router.use(authenticateToken);

router.get('/', cartController.getCartItems);
router.post('/', cartController.addToCart);
router.post('/checkout', cartController.checkoutCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.deleteCartItem);


module.exports = router;
