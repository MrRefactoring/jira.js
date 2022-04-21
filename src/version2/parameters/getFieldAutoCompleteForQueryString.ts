export interface GetFieldAutoCompleteForQueryString {
  /** The name of the field. */
  fieldName?: string;
  /** The partial field item name entered by the user. */
  fieldValue?: string;
  /**
   * The name of the [ CHANGED operator
   * predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which
   * the suggestions are generated. The valid predicate operators are _by_, _from_, and _to_.
   */
  predicateName?: string;
  /** The partial predicate item name entered by the user. */
  predicateValue?: string;
}
