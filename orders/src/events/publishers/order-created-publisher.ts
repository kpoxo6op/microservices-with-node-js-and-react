import {
  Publisher,
  Subjects,
  OrderCreatedEvent,
} from '@sgtickets-kpoxo6op/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
