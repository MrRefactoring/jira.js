export interface MoveFieldBean {
  /** The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't provided. */
  after?: string;
  /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
  position?: string;
}
