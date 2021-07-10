import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth } from '../utils';
const orderRouter = express.Router();

orderRouter.post('/', 
  isAuth, 
  expressAsyncHandler(async (request, response) => {
    const order = new Order({
      orderItems: request.body.orderItems,
      user: request.user._id,
      shipping: request.body.shipping,
      payment: request.body.payment,
      itemsPrice: request.body.itemsPrice,
      taxPrice: request.body.taxPrice,
      shippingPrice: request.body.shippingPrice,
      totalPrice: request.body.totalPrice,
    });
    const createdOrder = await order.save();
    response.status(201).send({ message: 'New Order Created', data: createdOrder });
  })
);
export default orderRouter;