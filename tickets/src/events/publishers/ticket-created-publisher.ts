import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@sgtickets-kpoxo6op/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
