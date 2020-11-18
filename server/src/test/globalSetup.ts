import { Connection } from 'typeorm';
import { getDbConnection } from '../db/database';
import { UserFactory } from './factories/user-factory';
import { UserRole } from '../enum/role';
import { env } from 'process';

async function truncateTables(connection: Connection): Promise<void> {
   await connection.query(`
  CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
  DECLARE
      statements CURSOR FOR
          SELECT tablename FROM pg_tables
          WHERE tableowner = username AND schemaname = 'public';
  BEGIN
      FOR stmt IN statements LOOP
          EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' RESTART IDENTITY CASCADE;';
      END LOOP;
  END;
  $$ LANGUAGE plpgsql;
  `);

   await connection.query("SELECT truncate_tables('postgres')");
}

export default async function globalSetup(): Promise<void> {
   console.log('\nConnecting to the testing db...');
   console.log('\n Dir name : ' + __dirname);
   console.log('\n node env: ' + process.env.node_env);
   const connection = await getDbConnection();
   console.log('Truncating all the tables...');

   // Cleaning all the db to make sure tests are atomic
   await truncateTables(connection);

   console.log('Inserting testing data into the tables...');
   await UserFactory.create('John Doe', 'john.doe@test.com', 'admin123*', UserRole.OWNER);

   console.log('Setup done');
}
