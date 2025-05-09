/** List of custom fields identifiers which will be used to filter configurations */
export interface ConfigurationsListParameters {
  /** List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query. */
  fieldIdsOrKeys: string[];
}
