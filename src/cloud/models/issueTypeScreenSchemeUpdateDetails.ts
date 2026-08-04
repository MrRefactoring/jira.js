import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an issue type screen scheme. */

export const IssueTypeScreenSchemeUpdateDetailsSchema = apiObject({
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type IssueTypeScreenSchemeUpdateDetails = z.infer<typeof IssueTypeScreenSchemeUpdateDetailsSchema>;
