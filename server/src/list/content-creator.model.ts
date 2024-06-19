import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class ContentCreator extends Model<ContentCreator> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nick: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  followersYtb: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  lastVideoInAWeek: boolean;
}
