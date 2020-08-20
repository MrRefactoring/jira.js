import { Application } from './application';
import { RemoteObject } from './remoteObject';

export interface RemoteIssueLink {
    id: number;
    self: string;
    globalId: string;
    application: Application[];
    relationship: string;
    object: RemoteObject[];
}
