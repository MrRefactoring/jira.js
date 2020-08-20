import { Scope } from './scope';

export interface IssueTypeIssueCreateMetadata {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: boolean;
    avatarId: number;
    entityId: string;
    scope: Scope[];
    expand: string;
    fields: {
        [key: string]: any;
    };
}
