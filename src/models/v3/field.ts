import { FieldLastUsed } from "./fieldLastUsed";
import { JsonTypeBean } from "./jsonTypeBean";

export interface Field {
    id: string;
    name: string;
    schema?: JsonTypeBean[];
    description?: string;
    key?: string;
    isLocked?: boolean;
    screensCount?: number;
    contextsCount?: number;
    lastUsed?: FieldLastUsed[];
}