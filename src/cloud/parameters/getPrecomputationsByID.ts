import { z } from 'zod';
import { openEnum } from '#/core';
import { JqlFunctionPrecomputationGetByIdRequestSchema } from '../models';

export const GetPrecomputationsByIDSchema = z.object(JqlFunctionPrecomputationGetByIdRequestSchema.shape).extend({
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `functionKey` Sorts by the functionKey.
   * - `used` Sorts by the used timestamp.
   * - `created` Sorts by the created timestamp.
   * - `updated` Sorts by the updated timestamp.
   */
  orderBy: openEnum([
    'functionKey',
    '-functionKey',
    '+functionKey',
    'used',
    '-used',
    '+used',
    'created',
    '-created',
    '+created',
    'updated',
    '-updated',
    '+updated',
  ]).optional(),
});

export type GetPrecomputationsByID = z.input<typeof GetPrecomputationsByIDSchema>;
