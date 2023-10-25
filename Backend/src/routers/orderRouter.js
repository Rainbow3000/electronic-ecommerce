const express = require('express'); 
const router = express.Router(); 
const orderController = require('../controllers/orderController')

router.post('/api/order',orderController.createOrder); 
router.post('/api/order/exportToExcel',orderController.exportToExcel); 
router.get('/api/order',orderController.getAllOrder); 
router.get('/api/order/orderStat',orderController.orderStat)
router.get('/api/order/orderIncome',orderController.orderIncome)
router.get('/api/order/countOrderReturn',orderController.countOrderReturn)
router.get('/api/order/compareOrder',orderController.compareOrder)
router.put('/api/order/:orderId',orderController.updateOrder);
router.delete('/api/order/:id',orderController.deleteOrder)
router.get('/api/order/:userId',orderController.getOrderByUserId);

module.exports = router; 