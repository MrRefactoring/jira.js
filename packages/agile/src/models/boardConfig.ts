import { z } from 'zod';

export const BoardConfigSchema = z.object({
  columnConfig: z
    .object({
      columns: z
        .array(
          z.object({
            max: z.number().optional(),
            min: z.number().optional(),
            name: z.string().optional(),
            statuses: z
              .array(
                z.object({
                  id: z.string().optional(),
                  self: z.url().optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      constraintType: z.string().optional(),
    })
    .optional(),
  estimation: z
    .object({
      field: z
        .object({
          displayName: z.string().optional(),
          fieldId: z.string().optional(),
        })
        .optional(),
      type: z.string().optional(),
    })
    .optional(),
  filter: z
    .object({
      id: z.string().optional(),
      self: z.url().optional(),
    })
    .optional(),
  id: z.number().optional(),
  location: z
    .object({
      projectKeyOrId: z.string().optional(),
      type: z.enum(['project', 'user']).optional(),
    })
    .optional(),
  name: z.string().optional(),
  ranking: z
    .object({
      rankCustomFieldId: z.number().optional(),
    })
    .optional(),
  self: z.url().optional(),
  subQuery: z
    .object({
      query: z.string().optional(),
    })
    .optional(),
  type: z.string().optional(),
});

export type BoardConfig = z.infer<typeof BoardConfigSchema>;
