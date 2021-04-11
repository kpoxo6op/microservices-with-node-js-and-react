import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@sgtickets-kpoxo6op/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
