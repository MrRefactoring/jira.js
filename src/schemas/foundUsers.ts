import { UserPickerUser } from './userPickerUser';

export interface FoundUsers {
    users: UserPickerUser[];
    total: number;
    header: string;
}
