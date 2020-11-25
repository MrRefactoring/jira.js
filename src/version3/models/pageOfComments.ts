/**A page of comments.*/
export interface PageOfComments {
    [key: string]: any;
    /**The index of the first item returned.*/
    startAt?: number;
    /**The maximum number of items that could be returned.*/
    maxResults?: number;
    /**The number of items returned.*/
    total?: number;
    /**The list of comments.*/
    comments?: Comment[];
}