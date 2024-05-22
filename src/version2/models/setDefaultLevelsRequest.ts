import type { DefaultLevelValue } from './defaultLevelValue.js';

/** Details of new default levels. */
export interface SetDefaultLevelsRequest {
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: DefaultLevelValue[];
}
