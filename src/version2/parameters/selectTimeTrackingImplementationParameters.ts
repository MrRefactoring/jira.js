import { z } from 'zod';

export const SelectTimeTrackingImplementationParametersSchema = z.object({
  /** The key for the time tracking provider. For example, _JIRA_. */
  key: z.string(),
  /** The name of the time tracking provider. For example, _JIRA provided time tracking_. */
  name: z.string().optional(),
  /**
   * The URL of the configuration page for the time tracking provider app. For example, _/example/config/url_. This
   * property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking
   * provider app.
   */
  url: z.string().optional(),
});

export type SelectTimeTrackingImplementationParameters = z.infer<
  typeof SelectTimeTrackingImplementationParametersSchema
>;
