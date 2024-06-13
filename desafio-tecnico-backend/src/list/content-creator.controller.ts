import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ContentCreatorService } from './content-creator.service';
import { ContentCreatorDto } from './dto/content-creator.dto';

@Controller('content_creator')
export class ContentCreatorController {
  constructor(private readonly contentCreatorService: ContentCreatorService) {}

  @Get()
  findAll() {
    return this.contentCreatorService.findAll();
  }

  @Get(':page')
  findPage(@Param('page') page: string) {
    return this.contentCreatorService.findPage(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentCreatorService.findOne(id);
  }

  @Post()
  create(@Body() createContentCreatorDto: ContentCreatorDto) {
    return this.contentCreatorService.create(createContentCreatorDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContentCreatorDto: ContentCreatorDto,
  ) {
    return this.contentCreatorService.update(id, updateContentCreatorDto);
  }

  @Put('')
  updateAllFollowers(@Body() updateContentCreatorDto: ContentCreatorDto[]) {
    return this.contentCreatorService.updateAllFollowers(
      updateContentCreatorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentCreatorService.remove(id);
  }
}
