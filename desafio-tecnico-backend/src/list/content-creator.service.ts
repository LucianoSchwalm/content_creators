import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContentCreator } from './content-creator.model';
import { ContentCreatorDto } from './dto/content-creator.dto';

@Injectable()
export class ContentCreatorService {
  constructor(
    @InjectModel(ContentCreator)
    private contentCreatorModel: typeof ContentCreator,
  ) {}

  async findAll(): Promise<ContentCreator[]> {
    return this.contentCreatorModel.findAll();
  }

  async findOne(id: string): Promise<ContentCreator> {
    return this.contentCreatorModel.findOne({
      where: {
        id,
      },
    });
  }

  async findPage(page: string): Promise<ContentCreator[]> {
    return this.contentCreatorModel.findAll({
      limit: Number.parseInt(page) * 10
    });
  }

  async create(content_creator: ContentCreatorDto): Promise<ContentCreatorDto> {
    return this.contentCreatorModel.create(content_creator);
  }

  async update(id: string, updateContentCreatorDto: ContentCreatorDto): Promise<[number]> {
    return this.contentCreatorModel.update(updateContentCreatorDto, {
      where: {
        id,
      },
    });
  }

  async updateAllFollowers(updateContentCreatorDto: ContentCreatorDto[]): Promise<[number]> {

    const updatePromises = updateContentCreatorDto.map((item) => this.contentCreatorModel.update({...item, followersYtb: item.followersYtb + 5}, {
      where: {
        id: item.id,
      }
    }))
    const results = await Promise.all(updatePromises);

    // Calcule o número total de linhas atualizadas
    const totalUpdated = results.reduce((acc, [count]) => acc + count, 0);
  
    return [totalUpdated];
  }

  async remove(id: string): Promise<void> {
    const contentCreator = await this.findOne(id);
    await contentCreator.destroy();
  }
}
