/**Details of a parsed JQL query.*/
export interface ParsedJqlQuery {
    /**The JQL query that was parsed and validated.*/
    query: string;
    /**The syntax tree of the query. Empty if the query was invalid.*/
    structure?: JqlQuery[];
    /**The list of syntax or validation errors.*/
    errors?: string[];
}