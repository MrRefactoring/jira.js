import { Dashboard } from './dashboard';

export interface PageBeanDashboard {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Dashboard[];
}
