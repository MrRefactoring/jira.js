export interface RemoveModules {
  /**
   * The key of the module to remove. To include multiple module keys, provide multiple copies of this parameter. For
   * example, `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`. Nonexistent keys are ignored.
   */
  moduleKey?: string[];
}
