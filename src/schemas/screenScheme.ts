import { ScreenTypeIDsBean } from './screenTypeIDsBean';

export interface ScreenScheme {
    id: number;
    name: string;
    description: string;
    screens: ScreenTypeIDsBean[];
}
