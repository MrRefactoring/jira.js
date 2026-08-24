import { z } from 'zod';
/** The resource owner of the product. */

export const ResourceOwnerSchema = z.string();

export type ResourceOwner = z.infer<typeof ResourceOwnerSchema>;
