import { getDbConnection } from '../db/database';
import { Connection } from 'typeorm';

export default async function globalTearDown() {
  console.log('Closing db connection...');
  const connection: Connection = await getDbConnection();
  await connection.close();
  console.log('Tear-down done');
}
