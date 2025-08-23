import { z } from 'zod';

export const FindUsersParametersSchema = z.object({
  /**
   * A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users.
   * The string can match the prefix of the attribute's value. For example, _query=john_ matches a user with a
   * `displayName` of _John Smith_ and a user with an `emailAddress` of _johnson@example.com_. Required, unless
   * `accountId` or `property` is specified.
   */
  query: z.string().optional(),
  username: z.string().optional(),
  /**
   * A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is
   * specified.
   */
  accountId: z.string().optional(),
  /** The index of the first item to return in a page of filtered results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * A query string used to search properties. Property keys are specified by path, so property keys containing dot (.)
   * or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To
   * search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use
   * `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified.
   */
  property: z.string().optional(),
});

export type FindUsersParameters = z.infer<typeof FindUsersParametersSchema>;
