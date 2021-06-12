import { StatusDetails } from './statusDetails';

/** Details of an issue transition. */
export interface IssueTransition {
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id?: string;
  /** The name of the issue transition. */
  name?: string;
  to?: StatusDetails;
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
  /**
   * Details of the fields associated with the issue transition screen. Use this information to populate `fields` and
   * `update` in a transition request.
   */
  fields?: {};
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  looped?: boolean;
}
