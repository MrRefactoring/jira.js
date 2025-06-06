export interface GetDateFieldResponse {
  /** A date custom field ID. This is returned if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /** The date field type. This is "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: 'DueDate' | 'TargetStartDate' | 'TargetEndDate' | 'DateCustomField' | string;
}
