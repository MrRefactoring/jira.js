import { EntityProperty } from './entityProperty';

export interface ChangedWorklog {
    worklogId: number;
    updatedTime: number;
    properties: EntityProperty[];
}
