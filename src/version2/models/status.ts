/**The status of the item.*/
export interface Status {
    [key: string]: any;
    /**Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font, otherwise the link displays in normal font.*/
    resolved?: boolean;
    /**Details of the icon representing the status. If not provided, no status icon displays in Jira.*/
    icon?: Icon[];
}