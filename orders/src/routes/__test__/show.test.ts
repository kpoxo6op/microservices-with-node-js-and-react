import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  //create 1 tickets
  const ticket = Ticket.build({
    title: 'ccc',
    price: 20,
  });
  await ticket.save();
  const user = global.signin();

  // build order
  await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // build order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch get order id
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(201);

  expect(fetchOrder.body[0].id).toEqual(order.id);
});

it('it returns an error when user fetches other user ticket ', async () => {
  //create 1 tickets
  const ticket = Ticket.build({
    title: 'ccc3',
    price: 20,
  });
  await ticket.save();
  const user = global.signin();

  // build order
  await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // build order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch get order id
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
