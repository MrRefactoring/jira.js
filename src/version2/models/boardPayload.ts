import type { CardLayout } from './cardLayout';
import type { CardLayoutField } from './cardLayoutField';
import type { BoardColumnPayload } from './boardColumnPayload';
import type { BoardFeaturePayload } from './boardFeaturePayload';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';
import type { QuickFilterPayload } from './quickFilterPayload';
import type { SwimlanesPayload } from './swimlanesPayload';
import type { WorkingDaysConfig } from './workingDaysConfig';

/** The payload for creating a board */
export interface BoardPayload {
  /**
   * Takes in a JQL string to create a new filter. If no value is provided, it'll default to a JQL filter for the
   * project creating
   */
  boardFilterJQL?: string;
  /** Card color settings of the board */
  cardColorStrategy?: 'ISSUE_TYPE' | 'REQUEST_TYPE' | 'ASSIGNEE' | 'PRIORITY' | 'NONE' | 'CUSTOM' | string;
  cardLayout?: CardLayout;
  /** Card layout settings of the board */
  cardLayouts?: CardLayoutField[];
  /** The columns of the board */
  columns?: BoardColumnPayload[];
  /** Feature settings for the board */
  features?: BoardFeaturePayload[];
  /** The name of the board */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The quick filters for the board. */
  quickFilters?: QuickFilterPayload[];
  /** Whether sprints are supported on the board */
  supportsSprint?: boolean;
  swimlanes?: SwimlanesPayload;
  workingDaysConfig?: WorkingDaysConfig;
}
