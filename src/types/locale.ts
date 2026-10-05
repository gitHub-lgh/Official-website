export type Locale = 'en' | 'zh';

export interface Translations {
  // Header
  name: string;
  title: string;
  
  // Personal info
  developer: string;
  formerPM: string;
  education: string;
  
  // Bio
  bio: string;
  
  // Works section
  works: string;
  
  // 便便助手 / Poop Recorder
  bianbianName: string;
  pictuneDescription: string;
  pictuneDetail1: string;
  pictuneDetail2: string;
  
  // Pixel像素板 / Pixel Board
  pixelboardName: string;
  pixelboardDescription: string;
  pixelboardDetail: string;
  
  // 易图 / EasyChart
  easychartName: string;
  easychartDescription: string;
  easychartDetail: string;
  
  // 书影小角落 / Book & Film Corner
  bookfilmName: string;
  bookfilmDescription: string;
  bookfilmDetail: string;
  
  // 日常小记 / Daily Record
  dailyrecordName: string;
  dailyrecordDescription: string;
  dailyrecordDetail: string;
  
  // Social
  xiaohongshu: string;
  
  // Store badge
  androidBadge: string;
  
  // Footer
  copyright: string;
  
  // Language switcher
  switchToZh: string;
  switchToEn: string;
}
