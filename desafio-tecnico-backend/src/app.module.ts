import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ContentCreatorsModule } from './list/content-creator.module';
import { DatabaseInitService } from './database-init.service';
import { ContentCreator } from './list/content-creator.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root_password',
      database: 'desafio_pratico_nestjs',
      models: [ContentCreator],
      autoLoadModels: true,
      synchronize: true,
    }),
    ContentCreatorsModule,
  ],
  providers: [DatabaseInitService]
})
export class AppModule {}
