import { AssociatedItemBean } from "./associatedItemBean";
import { ChangedValueBean } from "./changedValueBean";

export interface AuditRecordBean {
    id: number;
    summary: string;
    remoteAddress: string;
    authorKey: string;
    created: string;
    category: string;
    eventSource: string;
    description: string;
    objectItem: AssociatedItemBean[];
    changedValues: ChangedValueBean[];
    associatedItems: AssociatedItemBean[];
}