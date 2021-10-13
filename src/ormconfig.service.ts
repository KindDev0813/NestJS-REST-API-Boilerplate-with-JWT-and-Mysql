import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.env.DB_HOST,
      port: Number(this.env.DB_PORT),
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_NAME,
      logging: false,

      entities: [join(__dirname, '**', '**', '**', '*.entity.{ts,js}')],

      migrationsTableName: 'migration',
      migrations: [join(__dirname, '..', 'migrations', '*.ts')],

      cli: {
        migrationsDir: './mysql/migrations',
      },

      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env);

export default configService;
