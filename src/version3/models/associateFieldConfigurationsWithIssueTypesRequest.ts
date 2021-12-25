import { FieldConfigurationToIssueTypeMapping } from './fieldConfigurationToIssueTypeMapping';

/** Details of a field configuration to issue type mappings. */
export interface AssociateFieldConfigurationsWithIssueTypesRequest {
  /** Field configuration to issue type mappings. */
  mappings: FieldConfigurationToIssueTypeMapping[];
}
