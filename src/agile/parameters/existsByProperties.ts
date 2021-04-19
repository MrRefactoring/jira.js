export interface ExistsByProperties {
  /**
   * @deprecated
   */
  _updateSequenceId?: number;
  /** An optional property. Filters out entities and repositories which have updateSequenceId greater than specified. */
  updateSequenceId?: number;
}
