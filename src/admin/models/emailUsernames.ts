import { z } from 'zod';
import { apiObject } from '#/core';

export const EmailUsernamesSchema = apiObject({
  /**
   * The list of email usernames to filter by, eg: for `abc@hello.com`, emailUsername is `abc`. Sample query param
   * `{"emailUsernames":{"eq":["abc"]}}`
   */
  eq: z.array(z.string().max(100, 'eq must be at most 100 characters')).optional(),
  /** Partial email username filter */
  contains: z.string().optional(),
});

export type EmailUsernames = z.infer<typeof EmailUsernamesSchema>;
