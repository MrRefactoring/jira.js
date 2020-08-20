import { ChangeDetails } from './changeDetails';
import { HistoryMetadata } from './historyMetadata';
import { UserDetails } from './userDetails';

export interface Changelog {
    id: string;
    author: UserDetails[];
    created: string;
    items: ChangeDetails[];
    historyMetadata: HistoryMetadata[];
}
