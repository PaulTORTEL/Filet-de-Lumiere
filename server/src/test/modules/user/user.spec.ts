import supertest from 'supertest';
import app from '../../../app';
import { getDbConnection } from '../../../db/database';
import { User } from '../../../db/entities/user';
import { UserRole } from '../../../enum/role';
import { UserFactory } from '../../factories/user-factory';
import { OK, UNAUTHORIZED, NOTFOUND } from '../../../api/utils/status-code';
import UserService from '../../../api/modules/user/user.service';

let authRequester: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
   authRequester = supertest(app);
});

afterAll(async done => {
   getDbConnection()
      .then(connection => connection.close())
      .finally(done());
});

describe('Check the user roles', () => {
   it('should return the correct user role', async done => {
      const user = await UserFactory.create('Azert', 'ty@uio.p', 'azeaze', UserRole.BASIC);
      const user2 = await UserFactory.create('Azeqsd', 'qsd@uio.p', 'qsdqsd', UserRole.OWNER);

      UserService.getUserRole(user.id)
         .then(async userRole => {
            expect(userRole === UserRole.BASIC);
            await User.deleteUser(user.id);
         })
         .then(async () => {
            UserService.getUserRole(user2.id).then(async userRole => {
               expect(userRole === UserRole.OWNER);
               await User.deleteUser(user2.id);
               done();
            });
         });
   });
});
