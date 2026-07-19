import { z } from 'zod';
import { JqlFunctionPrecomputationGetByIdRequestSchema } from '../models';

export const GetPrecomputationsByIDSchema = z
  .object({
    /**
     * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
     *
     * - `functionKey` Sorts by the functionKey.
     * - `used` Sorts by the used timestamp.
     * - `created` Sorts by the created timestamp.
     * - `updated` Sorts by the updated timestamp.
     */
    orderBy: z.string().optional(),
  })
  .extend(JqlFunctionPrecomputationGetByIdRequestSchema.shape);

export type GetPrecomputationsByID = z.input<typeof GetPrecomputationsByIDSchema>;
