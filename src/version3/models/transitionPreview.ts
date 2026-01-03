import type { PreviewRuleConfiguration } from './previewRuleConfiguration';
import type { PreviewConditionGroupConfiguration } from './previewConditionGroupConfiguration';
import type { TransitionLink } from './transitionLink';
import type { PreviewTrigger } from './previewTrigger';

/** Details about a workflow transition in preview context. */
export interface TransitionPreview {
  /** The post-functions of the transition. */
  actions?: PreviewRuleConfiguration[];
  conditions?: PreviewConditionGroupConfiguration;
  /** The custom issue event ID for the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links?: TransitionLink[];
  /** The name of the transition. */
  name?: string;
  /** The status the transition goes to. */
  toStatusReference?: string;
  transitionScreen?: PreviewRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: PreviewTrigger[];
  /** The transition type. */
  type?: 'INITIAL' | 'GLOBAL' | 'DIRECTED' | string;
  /** The validators of the transition. */
  validators?: PreviewRuleConfiguration[];
}
