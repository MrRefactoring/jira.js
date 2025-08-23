import { z } from 'zod';

export const GetFieldConfigurationSchemeMappingsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with
   * ampersand: `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`.
   */
  fieldConfigurationSchemeId: z.array(z.number().int()).optional(),
});

export type GetFieldConfigurationSchemeMappingsParameters = z.infer<
  typeof GetFieldConfigurationSchemeMappingsParametersSchema
>;
