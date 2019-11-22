import { createConnection, Connection } from 'typeorm';

export default function getDatabaseConn(): Promise<Connection> {
  return createConnection(process.env.NODE_ENV !== 'test' ? 'default' : 'test');
}
