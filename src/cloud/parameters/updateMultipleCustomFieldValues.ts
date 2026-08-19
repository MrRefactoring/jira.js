import { z } from 'zod';
import { MultipleCustomFieldValuesUpdateDetailsSchema } from '../models';

export const UpdateMultipleCustomFieldValuesSchema = z
  .object(MultipleCustomFieldValuesUpdateDetailsSchema.shape)
  .extend({
    /** Whether to generate a changelog for this update. */
    generateChangelog: z.boolean().optional(),
    /**
     * Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured
     * webhooks (registered via the Jira admin UI). Note: Suppressing events means that "issue updated" events will not
     * be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for
     * the updated field, resulting in potentially confusing behaviour. We do not recommend using this flag in a
     * Marketplace app as it may result in incompatibilities with other apps that depend on up-to-date issue data.
     */
    generateAppEvents: z.boolean().optional(),
  });

export type UpdateMultipleCustomFieldValues = z.input<typeof UpdateMultipleCustomFieldValuesSchema>;
