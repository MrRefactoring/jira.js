import { Comment } from "./comment";

export interface PageBeanComment {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Comment[];
}