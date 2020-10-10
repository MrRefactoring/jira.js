import { ScreenTypes } from './screenTypes';

export interface ScreenSchemeDetails {
  name: string;
  description?: string;
  screens?: ScreenTypes[];
}
