import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@sgtickets-kpoxo6op/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
