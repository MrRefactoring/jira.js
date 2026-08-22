import { z } from 'zod';
import { ObjectAQLParamsSchema } from '../models';

export const FindObjectsByAqlSchema = z.object(ObjectAQLParamsSchema.shape).extend({
  /** The starting index for the next page of results */
  startAt: z.number().optional(),
  /**
   * The maximum number of objects to return in this page of results. Actual number of results may be less, for example,
   * if the last page of results is returned.
   */
  maxResults: z.number().optional(),
  /**
   * Should the objects attributes be included in the response. If this parameter is false only the information on the
   * object will be returned and the object attributes will not be present
   */
  includeAttributes: z.boolean().optional(),
});

export type FindObjectsByAql = z.input<typeof FindObjectsByAqlSchema>;
