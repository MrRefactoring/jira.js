import { z } from 'zod';

/** List of custom fields identifiers which will be used to filter configurations */
export const ConfigurationsListParametersSchema = z.object({
  /** List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query. */
  fieldIdsOrKeys: z.array(z.string()),
});

export type ConfigurationsListParameters = z.infer<typeof ConfigurationsListParametersSchema>;
