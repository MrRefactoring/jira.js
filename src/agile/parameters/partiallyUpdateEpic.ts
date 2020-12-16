export interface PartiallyUpdateEpic {
  /** The id or key of the epic to update. */
  epicIdOrKey: string;
  name?: string;
  summary?: string;
  color?: {
    key?: string;
  };
  done?: boolean;
}
