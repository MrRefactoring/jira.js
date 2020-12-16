export interface VersionMoveBean {
  /** The URL (self link) of the version after which to place the moved version. Cannot be used with `position`. */
  after?: string;
  /** An absolute position in which to place the moved version. Cannot be used with `after`. */
  position?: string;
}
