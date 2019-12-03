import app from './app';
import { getDbConnection } from './db/database';

app.listen(3000, () => {
  getDbConnection();
  console.clear();
  console.log('*** FILET DE LUMIERE API ***');
});
