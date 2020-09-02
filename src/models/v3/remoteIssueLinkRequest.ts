import { Application } from "./application";
import { RemoteObject } from "./remoteObject";

export interface RemoteIssueLinkRequest {
    globalId: string;
    application: Application[];
    relationship: string;
    object: RemoteObject[];
    [key: string]: unknown;
}