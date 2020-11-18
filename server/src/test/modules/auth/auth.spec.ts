import supertest from 'supertest';
import app from '../../../app';
import { getDbConnection } from '../../../db/database';
import { User } from '../../../db/entities/user';
import { UserRole } from '../../../enum/role';
import { UserFactory } from '../../factories/user-factory';
import { OK, UNAUTHORIZED, NOTFOUND } from '../../../api/utils/status-code';
import AuthService from '../../../api/modules/auth/auth.service';

let authRequester: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
   authRequester = supertest(app);
});

afterAll(async done => {
   getDbConnection()
      .then(connection => connection.close())
      .finally(done());
});

describe('Check the login process', () => {
   it('should return a JWT when login is successful', async done => {
      authRequester
         .post('/api/auth/login')
         .send({ username: 'John Doe', password: 'admin123*' })
         .set('Accept', 'application/json')
         .expect(OK)
         .then(response => {
            expect(response.body).toBeDefined();
            expect(response.body.id).toBeDefined();
            expect(response.body.username).toBeDefined();

            const cookies: string = response.header['set-cookie'];
            expect(cookies.includes('access_token'));
            expect(cookies.includes('refresh_token'));
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

describe('Check the disconnection process', () => {
   it('should return an error since the access token is not provided', async done => {
      authRequester
         .post('/api/auth/disconnect')
         .set('Accept', 'application/json')
         .expect(UNAUTHORIZED)
         .then(() => {
            done();
         })
         .catch(err => {
            done(err);
         });
   });

   it('should return OK even though the access token is incorrect', async done => {
      authRequester
         .post('/api/auth/disconnect')
         .set('Cookie', ['access_token=incorrect_token'])
         .set('Accept', 'application/json')
         .expect(OK)
         .then(() => {
            done();
         })
         .catch(err => {
            done(err);
         });
   });

   it('should return OK since the access token is correct', async done => {
      const user = await UserFactory.create('Azert', 'ty@uio.p', 'azeaze', UserRole.BASIC);
      const accessToken = AuthService.generateAccessToken(user);

      authRequester
         .post('/api/auth/disconnect')
         .set('Cookie', ['access_token=' + accessToken])
         .set('Accept', 'application/json')
         .expect(OK)
         .then(async () => {
            await User.deleteUser(user.id);
            done();
         })
         .catch(err => {
            done(err);
         });
   });
});
