export interface ContentCreatorDto {
    id: number,
    nick: string;
    email?: string;
    followersYtb: number;
    country: string;
    lastVideoInAWeek: boolean;
    isChecked?: boolean;
  }