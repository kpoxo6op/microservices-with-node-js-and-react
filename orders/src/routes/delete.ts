import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets-kpoxo6op/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publish event this order cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      version: order.__v!, //https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19565152#questions/12364886
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
