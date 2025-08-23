import { z } from 'zod';

export const IdBeanSchema = z.object({
  /**
   * The ID of the permission scheme to associate with the project. Use the [Get all permission
   * schemes](#api-rest-api-2-permissionscheme-get) resource to get a list of permission scheme IDs.
   */
  id: z.number().int(),
});

export type IdBean = z.infer<typeof IdBeanSchema>;
