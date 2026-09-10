import { z } from 'zod';
import { apiObject } from '#/core';

export const EventLocationModelSchema = apiObject({
  /** IP address */
  ip: z.string().optional(),
  /** Geo location of the IP address */
  geo: z.string().optional(),
  /** Country location according to the IP address */
  countryName: z.string().optional(),
  /** Region location according to the IP address */
  regionName: z.string().optional(),
  /** City location according to the IP address */
  city: z.string().optional(),
});

export type EventLocationModel = z.infer<typeof EventLocationModelSchema>;
