import { createConnection } from 'typeorm';

export default createConnection(
  process.env.NODE_ENV !== 'test' ? 'default' : 'test'
);
