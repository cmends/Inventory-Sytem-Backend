import { Router } from 'express';
import {
	getAllProducts,
	getSingleProduct,
	getProductByName,
	addProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/products.js';
import {
	checkForProduct,
	validateProduct,
	checkForProductName,
} from '../middleware/products.js';

const router = Router();

router.get('/all/products', getAllProducts);
router.get('/product/:id', checkForProduct, getSingleProduct);
router.get('/product/:name', checkForProductName, getProductByName);
router.post('/:userID/products', validateProduct, addProduct);
router.put('/product/:id', checkForProduct, updateProduct);
router.delete('/product/:id', checkForProduct, deleteProduct);

export default router;
