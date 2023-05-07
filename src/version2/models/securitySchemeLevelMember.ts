export interface SecuritySchemeLevelMember {
  /** The value corresponding to the specified member type. */
  parameter?: string;
  /** The issue security level member type, e.g `reporter`, `group`, `user`. */
  type: 'reporter' | 'group' | 'user' | string;
}
