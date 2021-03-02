export interface MoveIssuesToEpic {
  /** The id or key of the epic that you want to assign issues to. */
  epicIdOrKey: string;
  issues?: string[];
}
