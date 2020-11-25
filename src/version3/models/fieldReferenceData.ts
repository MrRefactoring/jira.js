/**Details of a field that can be used in advanced searches.*/
export interface FieldReferenceData {
    /**The field identifier.*/
    value?: string;
    /**The display name of the field.*/
    displayName?: string;
    /**Whether the field can be used in a query's `ORDER BY` clause.*/
    orderable?: string;
    /**Whether the content of this field can be searched.*/
    searchable?: string;
    /**Whether the field provide auto-complete suggestions.*/
    auto?: string;
    /**If the item is a custom field, the ID of the custom field.*/
    cfid?: string;
    /**The valid search operators for the field.*/
    operators?: string[];
    /**The data types of items in the field.*/
    types?: string[];
}