import { UserDetails } from "./userDetails";

export interface PagedListUserDetailsApplicationUser {
    size: number;
    items: UserDetails[];
    "max-results": number;
    "start-index": number;
    "end-index": number;
}