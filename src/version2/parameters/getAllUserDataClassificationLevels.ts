export interface GetAllUserDataClassificationLevels {
  /** Optional set of statuses to filter by. */
  status?: ('PUBLISHED' | 'ARCHIVED' | 'DRAFT' | string)[];
  /** Ordering of the results by a given field. If not provided, values will not be sorted. */
  orderBy?: 'rank' | '-rank' | '+rank' | string;
}
