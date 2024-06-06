import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContentCreatorController } from './content-creator.controller';
import { ContentCreatorService } from './content-creator.service';
import { ContentCreator } from './content-creator.model';

@Module({
  imports: [SequelizeModule.forFeature([ContentCreator])],
  controllers: [ContentCreatorController],
  providers: [ContentCreatorService],
  exports: [SequelizeModule]
})
export class ContentCreatorsModule {}
