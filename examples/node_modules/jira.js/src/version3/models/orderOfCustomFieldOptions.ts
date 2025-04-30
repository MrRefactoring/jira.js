/** An ordered list of custom field option IDs and information on where to move them. */
export interface OrderOfCustomFieldOptions {
  /**
   * A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order
   * they are given after the move. The list must contain custom field options or cascading options, but not both.
   */
  customFieldOptionIds: string[];
  /**
   * The ID of the custom field option or cascading option to place the moved options after. Required if `position`
   * isn't provided.
   */
  after?: string;
  /** The position the custom field options should be moved to. Required if `after` isn't provided. */
  position?: string;
}
