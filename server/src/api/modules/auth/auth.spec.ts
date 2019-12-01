import supertest from 'supertest';
import app from '../../../app';
import { getDbConnection } from '../../../db/database';
import { OK, UNAUTHORIZED, NOTFOUND } from '../../utils/status-code';

let authRequester: supertest.SuperTest<supertest.Test>;

beforeAll(() => {
  authRequester = supertest(app);
});

afterAll(async done => {
  getDbConnection()
    .then(connection => connection.close())
    .finally(done());
});

describe('Authentication verification processes', () => {
  it('should return a JWT when login is successful', async done => {
    authRequester
      .post('/api/auth/login')
      .send({ username: 'John Doe', password: 'admin123*' })
      .set('Accept', 'application/json')
      .expect(OK)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should block the request when the password is incorrect', async done => {
    authRequester
      .post('/api/auth/login')
      .send({ username: 'John Doe', password: 'wrong password' })
      .set('Accept', 'application/json')
      .expect(UNAUTHORIZED)
      .then(() => done())
      .catch(err => {
        done(err);
      });
  });

  it('should block the request when the email is unknown', async done => {
    authRequester
      .post('/api/auth/login')
      .send({ username: 'unknown', password: 'wrong password' })
      .set('Accept', 'application/json')
      .expect(NOTFOUND)
      .then(() => done())
      .catch(err => {
        done(err);
      });
  });
});
