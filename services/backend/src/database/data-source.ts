import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'tontine',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'tontine',

  entities: [User],

  migrations: [`${__dirname}/migrations/*.{js,ts}`],

  synchronize: false,
});
