import { EntityProperty } from './entityProperty';
import { UserDetails } from './userDetails';
import { Visibility } from './visibility';

export interface Comment {
    self: string;
    id: string;
    author: UserDetails[];
    body: string;
    renderedBody: string;
    updateAuthor: UserDetails[];
    created: string;
    updated: string;
    visibility: Visibility[];
    jsdPublic: boolean;
    properties: EntityProperty[];
    [key: string]: unknown;
}
