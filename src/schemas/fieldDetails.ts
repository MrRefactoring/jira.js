import { JsonTypeBean } from './jsonTypeBean';
import { Scope } from './scope';

export interface FieldDetails {
    id: string;
    key: string;
    name: string;
    custom: boolean;
    orderable: boolean;
    navigable: boolean;
    searchable: boolean;
    clauseNames: string[];
    scope: Scope[];
    schema: JsonTypeBean[];
}
