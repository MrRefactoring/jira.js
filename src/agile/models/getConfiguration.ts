import { z } from 'zod';
import { apiObject } from '#/core';

export const GetConfigurationSchema = apiObject({
  columnConfig: apiObject({
    columns: z
      .array(
        apiObject({
          max: z.number().optional(),
          min: z.number().optional(),
          name: z.string().optional(),
          statuses: z
            .array(
              apiObject({
                id: z.string().optional(),
                self: z.url().optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
    constraintType: z.string().optional(),
  }).optional(),
  estimation: apiObject({
    field: apiObject({
      displayName: z.string().optional(),
      fieldId: z.string().optional(),
    }).optional(),
    type: z.string().optional(),
  }).optional(),
  filter: apiObject({
    id: z.string().optional(),
    self: z.url().optional(),
  }).optional(),
  id: z.number().optional(),
  location: apiObject({
    projectKeyOrId: z.string().optional(),
    type: z.enum(['project', 'user']).optional(),
  }).optional(),
  name: z.string().optional(),
  ranking: apiObject({
    rankCustomFieldId: z.number().optional(),
  }).optional(),
  self: z.url().optional(),
  subQuery: apiObject({
    query: z.string().optional(),
  }).optional(),
  type: z.string().optional(),
});

export type GetConfiguration = z.infer<typeof GetConfigurationSchema>;
