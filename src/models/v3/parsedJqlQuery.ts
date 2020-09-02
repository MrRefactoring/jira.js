import { JqlQuery } from "./jqlQuery";

export interface ParsedJqlQuery {
    query: string;
    structure?: JqlQuery[];
    errors?: string[];
}