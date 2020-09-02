import { UserDetails } from "./userDetails";

export interface Watchers {
    self: string;
    isWatching: boolean;
    watchCount: number;
    watchers: UserDetails[];
}