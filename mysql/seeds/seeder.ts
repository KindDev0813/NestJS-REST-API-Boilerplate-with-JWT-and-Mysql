import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import CreateUsers from './user/create-user.seed';

dotenv.config();

const seed = async () => {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: false,
  });

  await new CreateUsers().run(connection);
  console.log('seeding is finished.');

  await connection.close();
};

seed();
