module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'filet_de_lumiere',
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'dist/migration',
      subscribersDir: 'dist/subscriber'
    }
  },
  {
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'filet_de_lumiere_test',
    synchronize: true,
    logging: false,
    entities: ['dist/src/entities/**/*{.ts,.js}'],
    cli: {
      entitiesDir: 'dist/src/entities',
      migrationsDir: 'dist/migration',
      subscribersDir: 'dist/subscriber'
    }
  }
];
