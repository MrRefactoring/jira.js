import type { Scope } from './scope';

/** Details of an issue transition. */
export interface IssueTransition {
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  /**
   * Details of the fields associated with the issue transition screen. Use this information to populate `fields` and
   * `update` in a transition request.
   */
  fields?: unknown;
  /** Whether there is a screen associated with the issue transition. */
  hasScreen?: boolean;
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id?: string;
  /** Whether the transition is available to be performed. */
  isAvailable?: boolean;
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional?: boolean;
  /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
  isGlobal?: boolean;
  /** Whether this is the initial issue transition for the workflow. */
  isInitial?: boolean;
  looped?: boolean;
  /** The name of the issue transition. */
  name?: string;
  /** A status. */
  to?: {
    /** The description of the status. */
    description?: string;
    /** The URL of the icon used to represent the status. */
    iconUrl?: string;
    /** The ID of the status. */
    id?: string;
    /** The name of the status. */
    name?: string;
    /**
     * The projects the item is associated with. Indicated for items associated with [next-gen
     * projects](https://confluence.atlassian.com/x/loMyO).
     */
    scope?: Scope;
    /** The URL of the status. */
    self?: string;
    /** A status category. */
    statusCategory?: {
      /** The name of the color used to represent the status category. */
      colorName?: string;
      /** The ID of the status category. */
      id?: number;
      /** The key of the status category. */
      key?: string;
      /** The name of the status category. */
      name?: string;
      /** The URL of the status category. */
      self: string;
    };
  };
}
