import type { z } from 'zod';
import { apiObject } from '#/core';
/** A JQL query clause. */

export const JqlQueryClauseSchema = apiObject({});

export type JqlQueryClause = z.infer<typeof JqlQueryClauseSchema>;
