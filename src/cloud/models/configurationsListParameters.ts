import { z } from 'zod';
import { apiObject } from '#/core';
/** List of custom fields identifiers which will be used to filter configurations */

export const ConfigurationsListParametersSchema = apiObject({
  /** List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query. */
  fieldIdsOrKeys: z.array(z.string()),
});

export type ConfigurationsListParameters = z.infer<typeof ConfigurationsListParametersSchema>;
