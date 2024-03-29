export interface RequestTypeFieldValue {
  /** Value of the field. */
  value?: string;
  /** Label for the field. */
  label?: string;
  /** List of child fields. */
  children?: RequestTypeFieldValue[];
}
