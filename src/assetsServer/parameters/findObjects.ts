import { z } from 'zod';

export const FindObjectsSchema = z.object({
  /**
   * How many levels of attributes should be included in the response.
   *
   * Example: Consider object A, which has a reference to object B, which has a reference to object C. If object A is
   * included in the response and `includeAttributesDeep=1`, object A's reference to object B will be included in the
   * attributes of object A but object B's reference to object C will not be included. However if
   * `includeAttributesDeep=2`, then object B's reference to object C will be included in object B's attributes.
   */
  includeAttributesDeep: z.string().optional(),
  xoauth_requestor_id: z.string().optional(),
  /**
   * Should the response include the object type attribute definition for each attribute that is returned with the
   * objects.
   */
  includeTypeAttributes: z.string().optional(),
  /** The number of objects returned per page. */
  resultPerPage: z.string().optional(),
  /**
   * Should object attributes be included in the response. If this parameter is set to `false`, only the information on
   * the object will be returned and object attributes will not be present.
   */
  includeAttributes: z.string().optional(),
  /**
   * The query to determine which objects should be fetched. For example, `objectType = "Computer"`. An empty query
   * means all objects are fetched.
   */
  qlQuery: z.string().optional(),
  /** The page to fetch when paginating through the response. */
  page: z.string().optional(),
  /**
   * Should the response include information about open issues and attachments. If the value is set to `true`, each
   * returned object contains information on whether there are open tickets connected to it and if the object has
   * attachments.
   */
  includeExtendedInfo: z.string().optional(),
});

export type FindObjects = z.input<typeof FindObjectsSchema>;
