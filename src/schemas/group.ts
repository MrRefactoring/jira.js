import { PagedListUserDetailsApplicationUser } from './pagedListUserDetailsApplicationUser';

export interface Group {
    name: string;
    self: string;
    users: PagedListUserDetailsApplicationUser[];
    expand: string;
}
