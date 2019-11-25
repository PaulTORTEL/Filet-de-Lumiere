import supertest from 'supertest';
import { getConnection } from 'typeorm';

afterAll(async () => {
  await getConnection().close();
});
describe('SAMPLE unit test', () => {
  // #1 should return home page

  it('should return home page', async done => {
    expect(1 + 2).toBe(3);
    const con = await getConnection();
    done();
  });
});
