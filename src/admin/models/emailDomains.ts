import { z } from 'zod';
import { apiObject } from '#/core';

export const EmailDomainsSchema = apiObject({
  /**
   * The list of email domains to filter by, eg: for `abc@hello.com`, emailDomain is `hello.com`. Sample query param
   * `{"emailDomains":{"eq":["hello.com"]}}`
   */
  eq: z.array(z.string().max(100, 'eq must be at most 100 characters')).optional(),
  /** Partial email domain filter */
  contains: z.string().optional(),
});

export type EmailDomains = z.infer<typeof EmailDomainsSchema>;
