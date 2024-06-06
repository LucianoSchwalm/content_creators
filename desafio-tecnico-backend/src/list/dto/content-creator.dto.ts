// src/users/dto/update-user.dto.ts
export class ContentCreatorDto {
    id?: number;
    nick: string;
    email?: string;
    followersYtb: number;
    country: string;
    lastVideoInAWeek: boolean;
  }