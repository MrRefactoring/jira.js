import { Dashboard } from './dashboard';

export interface PageOfDashboards {
    startAt: number;
    maxResults: number;
    total: number;
    prev: string;
    next: string;
    dashboards: Dashboard[];
}
