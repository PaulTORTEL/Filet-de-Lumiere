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

describe('Check the auth middleware', () => {
   it('should return an error since the access token is not provided', async done => {
      authRequester
         .get('/api/auth/role')
         .set('Accept', 'application/json')
         .expect(UNAUTHORIZED)
         .then(() => {
            done();
         })
         .catch(err => {
            done(err);
         });
   });

   it('should return an error since the access token is incorrect', async done => {
      authRequester
         .get('/api/auth/role')
         .set('Accept', 'application/json')
         .set('Cookie', ['access_token=incorrect_token'])
         .expect(UNAUTHORIZED)
         .then(() => {
            done();
         })
         .catch(err => {
            done(err);
         });
   });

   it('should return an error since the user is unknown even though the access token is valid', async done => {
      const user = await UserFactory.create('Azert', 'ty@uio.p', 'azeaze', UserRole.BASIC);
      const accessToken = AuthService.generateAccessToken(user);
      await User.deleteUser(user.id);

      authRequester
         .get('/api/auth/role')
         .set('Accept', 'application/json')
         .set('Cookie', ['access_token=' + accessToken])
         .expect(NOTFOUND)
         .then(() => {
            done();
         })
         .catch(err => {
            done(err);
         });
   });

   it('should return return OK', async done => {
      const user = await UserFactory.create('Azert', 'ty@uio.p', 'azeaze', UserRole.BASIC);
      const accessToken = AuthService.generateAccessToken(user);

      authRequester
         .get('/api/auth/role')
         .set('Accept', 'application/json')
         .set('Cookie', ['access_token=' + accessToken])
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
