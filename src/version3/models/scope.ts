/**The projects the item is associated with. Indicated for items associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO).*/
export interface Scope {
    [key: string]: any;
    /**The type of scope.*/
    type?: string;
    /**The project the item has scope in.*/
    project?: ProjectForScope[];
}