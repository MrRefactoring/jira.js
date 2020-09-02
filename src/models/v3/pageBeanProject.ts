import { Project } from "./project";

export interface PageBeanProject {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Project[];
}