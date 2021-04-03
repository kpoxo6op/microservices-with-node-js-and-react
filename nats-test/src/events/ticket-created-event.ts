import { Subjects } from './subjects';

// coupling between ticket:created subj name and the data structure for 'ticket created'
export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
