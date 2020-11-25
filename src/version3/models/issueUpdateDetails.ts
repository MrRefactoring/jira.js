/**Details of an issue update request.*/
export interface IssueUpdateDetails {
    [key: string]: any;
    /**Details of a transition. Required when performing a transition, optional when creating or editing an issue.*/
    transition?: IssueTransition[];
    /**List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`.*/
    fields?: {};
    /**List of operations to perform on issue screen fields. Note that fields included in here cannot be included in `fields`.*/
    update?: {};
    /**Additional issue history details.*/
    historyMetadata?: HistoryMetadata[];
    /**Details of issue properties to be add or update.*/
    properties?: EntityProperty[];
}