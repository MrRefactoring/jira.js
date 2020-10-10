import { ScreenTypes } from './screenTypes';

export interface ScreenScheme {
  id: number;
  name: string;
  description: string;
  screens: ScreenTypes[];
}
