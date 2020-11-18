import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Gallery } from './entities/gallery';
import { GalleryCategory } from './entities/gallery-category';
import { GalleryMetadata } from './entities/gallery-metadata';
import { Photo } from './entities/photo';
import { PhotoLike } from './entities/photo-like';
import { PhotoToGallery } from './entities/photo-to-gallery';
import { User } from './entities/user';

function getDefaultDbConfig(): PostgresConnectionOptions {
   return {
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'filet_de_lumiere',
      synchronize: true,
      logging: false,
      entities: ['src/db/entities/**/*.ts'],
      migrations: ['dist/migrations/**/*.js'],
      subscribers: ['src/subscriber/**/*.ts'],
      cli: {
         entitiesDir: 'src/db/entities',
         migrationsDir: 'dist/migration',
         subscribersDir: 'dist/subscriber'
      }
   };
}

function getTestDbConfig(): PostgresConnectionOptions {
   return {
      name: 'test',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'filet_de_lumiere_test',
      synchronize: true,
      logging: false,
      entities: [GalleryCategory, GalleryMetadata, Gallery, PhotoLike, PhotoToGallery, Photo, User]
   };
}

export async function getDbConnection(): Promise<Connection> {
   const connectionName = process.env.node_env !== 'test' ? 'default' : 'test';
   const connectionConfig = process.env.node_env !== 'test' ? getDefaultDbConfig() : getTestDbConfig();

   let connection: Connection;

   if (!getConnectionManager().has(connectionName)) {
      connection = await createConnection(connectionConfig);
   } else {
      connection = getConnection(connectionName);
   }
   return connection;
}
