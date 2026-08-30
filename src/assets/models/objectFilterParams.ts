import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeAttributesToDisplaySchema } from './objectTypeAttributesToDisplay';
/** A filter object that is used to find a paginated result set based on an object type and an AQL query */

export const ObjectFilterParamsSchema = apiObject({
  /** The AQL that will fetch the objects. The object type parameter will be appended implicitly to this AQL */
  qlQuery: z.string(),
  objectTypeId: z.string(),
  /** The requested page to be loaded for a paginated result. The default value is page = 1 */
  page: z.number().optional(),
  /** How many objects should be returned in the request. It is used with page attribute for pagination. */
  resultsPerPage: z.number(),
  /**
   * Which attribute should be used to order by. The preferred way is to use an order by in `qlQuery` and not pass this
   * argument.
   */
  orderByTypeAttrId: z.number().optional(),
  /**
   * Sort objects in ascending order or descending order based on the attribute identified by orderByTypeAttrId. 1 means
   * ascending all other values mean descending. The preferred way is to not supply the asc parameter and use an order
   * by in `qlQuery` instead.
   */
  asc: z.number().optional(),
  /**
   * Identifies an object that should be included in the result. The page will be calculated accordingly to include the
   * object specified in the result set
   */
  objectId: z.string().optional(),
  objectSchemaId: z.string(),
  /** Should attribute values be included in the response. */
  includeAttributes: z.boolean().optional(),
  /**
   * Identifies the attributes which values should be included in the response. Note that the includeAttributes must be
   * specified to true in order for this parameter to be used.
   */
  attributesToDisplay: ObjectTypeAttributesToDisplaySchema.optional(),
});

export type ObjectFilterParams = z.infer<typeof ObjectFilterParamsSchema>;
