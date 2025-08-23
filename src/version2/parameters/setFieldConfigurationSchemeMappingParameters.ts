import { z } from 'zod';
import { FieldConfigurationToIssueTypeMappingSchema } from './fieldConfigurationToIssueTypeMapping';

export const SetFieldConfigurationSchemeMappingParametersSchema = z.object({
  /** The ID of the field configuration scheme. */
  id: z.number().int(),
  /** Field configuration to issue type mappings. */
  mappings: z.array(FieldConfigurationToIssueTypeMappingSchema),
});

export type SetFieldConfigurationSchemeMappingParameters = z.infer<
  typeof SetFieldConfigurationSchemeMappingParametersSchema
>;
