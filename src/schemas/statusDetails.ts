import { StatusCategory } from './statusCategory';

export interface StatusDetails {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: StatusCategory[];
    [key: string]: unknown;
}
