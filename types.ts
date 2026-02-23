
export enum AspectRatio {
  LANDSCAPE = '16x9',
  PORTRAIT = '9x16'
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: AspectRatio;
  imageUrl: string;
  videoUrl?: string;
  description?: string;
  details?: string[];
  initialX: number;
  initialY: number;
}
