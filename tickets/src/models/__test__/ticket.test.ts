import { Ticket } from '../ticket';

it('implements optimistic cpncurrency control', async (done) => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });
  // save ticket to the db
  await ticket.save();
  // fetch ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  // save the 1st fetched ticket
  await firstInstance!.save();
  // save the 2nd fetched ticket
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('should not reach this point');
});

it('increments the version of the ticket', async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
