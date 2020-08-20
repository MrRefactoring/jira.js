import { LinkGroup } from './linkGroup';
import { SimpleLink } from './simpleLink';

export interface LinkGroup {
    id: string;
    styleClass: string;
    header: SimpleLink[];
    weight: number;
    links: SimpleLink[];
    groups: LinkGroup[];
}
