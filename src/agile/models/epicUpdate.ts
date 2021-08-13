/** @deprecated Use EpicUpdate instead. */
export type EpicUpdateBean = EpicUpdate;

export interface EpicUpdate {
  name?: string;
  summary?: string;
  color?: {
    key?: string;
  };
  done?: boolean;
}
