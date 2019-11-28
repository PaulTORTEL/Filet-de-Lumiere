import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';

export async function getDbConnection(): Promise<Connection> {
  const connectionName = process.env.node_env !== 'test' ? 'default' : 'test';
  let connection;

  if (!getConnectionManager().has(connectionName)) {
    connection = await createConnection(connectionName);
  } else {
    connection = getConnection(connectionName);
  }
  return connection;
}
