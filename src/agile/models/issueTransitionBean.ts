export interface IssueTransitionBean {
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id?: string;
  /** The name of the issue transition. */
  name?: string;
  to?: {
    /** The URL of the status. */
    self?: string;
    statusColor?: string;
    /** The description of the status. */
    description?: string;
    /** The URL of the icon used to represent the status. */
    iconUrl?: string;
    /** The name of the status. */
    name?: string;
    /** The ID of the status. */
    id?: string;
    statusCategory?: {
      /** The URL of the status category. */
      self?: string;
      /** The ID of the status category. */
      id?: number;
      /** The key of the status category. */
      key?: string;
      /** The name of the color used to represent the status category. */
      colorName?: string;
      /** The name of the status category. */
      name?: string;
    };
  };
  /** Whether there is a screen associated with the issue transition. */
  hasScreen?: boolean;
  /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
  isGlobal?: boolean;
  /** Whether this is the initial issue transition for the workflow. */
  isInitial?: boolean;
  /** Whether the transition is available to be performed. */
  isAvailable?: boolean;
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional?: boolean;
  /** Details of the fields associated with the issue transition screen. Use this information to populate <code>fields</code> and <code>update</code> in a transition request. */
  fields?: {};
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  looped?: boolean;
}
