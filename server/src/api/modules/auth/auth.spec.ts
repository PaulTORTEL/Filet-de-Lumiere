import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { getDbConnection } from '../../../db/database';

afterAll(async done => {
  getDbConnection()
    .then(connection => connection.close())
    .finally(done());
});
describe('SAMPLE unit test', () => {
  // #1 should return home page

  it('should return home page', async done => {
    expect(1 + 2).toBe(3);
    const con = await getDbConnection();
    done();
  });
});
