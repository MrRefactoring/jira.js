import { LinkGroup } from './linkGroup';

export interface Operations {
    linkGroups: LinkGroup[];
    [key: string]: unknown;
}
