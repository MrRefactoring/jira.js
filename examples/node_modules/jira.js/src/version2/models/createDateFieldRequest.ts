export interface CreateDateFieldRequest {
  /** A date custom field ID. This is required if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /** The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: 'DueDate' | 'TargetStartDate' | 'TargetEndDate' | 'DateCustomField' | string;
}
