import { User } from '../entities/user';
import { Connection } from 'typeorm';
import { getDbConnection } from '../db/database';

async function truncateTables(connection: Connection) {
  await connection.query(`
  CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
  DECLARE
      statements CURSOR FOR
          SELECT tablename FROM pg_tables
          WHERE tableowner = username AND schemaname = 'public';
  BEGIN
      FOR stmt IN statements LOOP
          EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
      END LOOP;
  END;
  $$ LANGUAGE plpgsql;
  `);

  await connection.query(`SELECT truncate_tables('${process.env.DB_USER}')`);
}

export default async function globalSetup() {
  console.log('\nConnecting to the testing db...');
  const connection = await getDbConnection();
  console.log('Truncating all the tables...');

  // Cleaning all the db to make sure tests are atomic
  await truncateTables(connection);

  console.log('Inserting testing data into the tables...');

  console.log('Setup done');
}
