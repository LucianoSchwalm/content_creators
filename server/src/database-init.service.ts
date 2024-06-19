import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContentCreator } from './list/content-creator.model';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(
    @InjectModel(ContentCreator)
    private readonly contentCreatorModel: typeof ContentCreator,
  ) {}

  async onModuleInit() {
    await this.createInitialUsers();
  }

  private async createInitialUsers() {
    const users = await this.contentCreatorModel.findAll();
    if (users.length === 0) {
      await this.contentCreatorModel.bulkCreate([
        { nick: 'Diego Fernandes', email: 'rocketseat@example.com',followersYtb: 363000, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Sebastian Lague', email: 'sebastlague@gmail.com',followersYtb: 1270000, country: 'Denmark', lastVideoInAWeek: false },
        { nick: 'Theo Browne', email: 't3dotgg@example.com',followersYtb: 288000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'Jason Goodison', email: 'jasongoodisondevelopment@gmail.com',followersYtb: 203000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Filipe Deschamps', followersYtb: 779000, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'Forrest Knight', email: "forrest@fkcodes.com", followersYtb: 538000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'OneBitCode', email: "contato@onebitcode.com", followersYtb: 45900, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Erick Wendel', email: "erick.workspace@gmail.com", followersYtb: 74600, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'DEVNAESTRADA', followersYtb: 5190, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Marco Rico Peng', followersYtb: 133000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Diego Fernandes', email: 'rocketseat@example.com',followersYtb: 363000, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Sebastian Lague', email: 'sebastlague@gmail.com',followersYtb: 1270000, country: 'Denmark', lastVideoInAWeek: false },
        { nick: 'Theo Browne', email: 't3dotgg@example.com',followersYtb: 288000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'Jason Goodison', email: 'jasongoodisondevelopment@gmail.com',followersYtb: 203000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Filipe Deschamps', followersYtb: 779000, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'Forrest Knight', email: "forrest@fkcodes.com", followersYtb: 538000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'OneBitCode', email: "contato@onebitcode.com", followersYtb: 45900, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Erick Wendel', email: "erick.workspace@gmail.com", followersYtb: 74600, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'DEVNAESTRADA', followersYtb: 5190, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Marco Rico Peng', followersYtb: 133000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Diego Fernandes', email: 'rocketseat@example.com',followersYtb: 363000, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Sebastian Lague', email: 'sebastlague@gmail.com',followersYtb: 1270000, country: 'Denmark', lastVideoInAWeek: false },
        { nick: 'Theo Browne', email: 't3dotgg@example.com',followersYtb: 288000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'Jason Goodison', email: 'jasongoodisondevelopment@gmail.com',followersYtb: 203000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Filipe Deschamps', followersYtb: 779000, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'Forrest Knight', email: "forrest@fkcodes.com", followersYtb: 538000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'OneBitCode', email: "contato@onebitcode.com", followersYtb: 45900, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Erick Wendel', email: "erick.workspace@gmail.com", followersYtb: 74600, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'DEVNAESTRADA', followersYtb: 5190, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Marco Rico Peng', followersYtb: 133000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Diego Fernandes', email: 'rocketseat@example.com',followersYtb: 363000, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Sebastian Lague', email: 'sebastlague@gmail.com',followersYtb: 1270000, country: 'Denmark', lastVideoInAWeek: false },
        { nick: 'Theo Browne', email: 't3dotgg@example.com',followersYtb: 288000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'Jason Goodison', email: 'jasongoodisondevelopment@gmail.com',followersYtb: 203000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Filipe Deschamps', followersYtb: 779000, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'Forrest Knight', email: "forrest@fkcodes.com", followersYtb: 538000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'OneBitCode', email: "contato@onebitcode.com", followersYtb: 45900, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Erick Wendel', email: "erick.workspace@gmail.com", followersYtb: 74600, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'DEVNAESTRADA', followersYtb: 5190, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Marco Rico Peng', followersYtb: 133000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Diego Fernandes', email: 'rocketseat@example.com',followersYtb: 363000, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Sebastian Lague', email: 'sebastlague@gmail.com',followersYtb: 1270000, country: 'Denmark', lastVideoInAWeek: false },
        { nick: 'Theo Browne', email: 't3dotgg@example.com',followersYtb: 288000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'Jason Goodison', email: 'jasongoodisondevelopment@gmail.com',followersYtb: 203000, country: 'USA', lastVideoInAWeek: false },
        { nick: 'Filipe Deschamps', followersYtb: 779000, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'Forrest Knight', email: "forrest@fkcodes.com", followersYtb: 538000, country: 'USA', lastVideoInAWeek: true },
        { nick: 'OneBitCode', email: "contato@onebitcode.com", followersYtb: 45900, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Erick Wendel', email: "erick.workspace@gmail.com", followersYtb: 74600, country: 'Brazil', lastVideoInAWeek: false },
        { nick: 'DEVNAESTRADA', followersYtb: 5190, country: 'Brazil', lastVideoInAWeek: true },
        { nick: 'Marco Rico Peng', followersYtb: 133000, country: 'USA', lastVideoInAWeek: false },
      ]);
      console.log('Inserted 40 default users.');
    } else {
      console.log('Users already exist in the table.');
    }
  }
}