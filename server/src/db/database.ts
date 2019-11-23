import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';

export default async function getDbConnection(): Promise<Connection> {
  let connectionName = process.env.NODE_ENV !== 'test' ? 'default' : 'test';

  if (!getConnectionManager().has(connectionName)) {
    await createConnection(connectionName);
  }
  return getConnection(connectionName);
}
