import { z } from 'zod';

export const GetAllGadgetsParametersSchema = z.object({
  /** The ID of the dashboard. */
  dashboardId: z.number().int(),
  /**
   * The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand:
   * `moduleKey=key:one&moduleKey=key:two`.
   */
  moduleKey: z.array(z.string()).optional(),
  /**
   * The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand:
   * `uri=/rest/example/uri/1&uri=/rest/example/uri/2`.
   */
  uri: z.array(z.string()).optional(),
  /** The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`. */
  gadgetId: z.array(z.number().int()).optional(),
});

export type GetAllGadgetsParameters = z.infer<typeof GetAllGadgetsParametersSchema>;
