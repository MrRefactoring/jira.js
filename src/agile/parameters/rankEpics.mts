export interface RankEpics {
  /** The id or key of the epic to rank. */
  epicIdOrKey: string;
  rankBeforeEpic?: string;
  rankAfterEpic?: string;
  rankCustomFieldId?: number;
}
