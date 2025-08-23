import { z } from 'zod';
import { FieldConfigurationToIssueTypeMappingSchema } from './fieldConfigurationToIssueTypeMapping';

/** Details of a field configuration to issue type mappings. */
export const AssociateFieldConfigurationsWithIssueTypesRequestSchema = z.object({
  /** Field configuration to issue type mappings. */
  mappings: z.array(FieldConfigurationToIssueTypeMappingSchema),
});

export type AssociateFieldConfigurationsWithIssueTypesRequest = z.infer<
  typeof AssociateFieldConfigurationsWithIssueTypesRequestSchema
>;
