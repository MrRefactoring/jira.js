import { UserDetails } from './userDetails';

export interface PageBeanUserDetails {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: UserDetails[];
}
