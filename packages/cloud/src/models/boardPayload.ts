import { z } from 'zod';
import { CardLayoutSchema } from '#/models/cardLayout';
import { CardLayoutFieldSchema } from '#/models/cardLayoutField';
import { BoardColumnPayloadSchema } from '#/models/boardColumnPayload';
import { ProjectCreateResourceIdentifierSchema } from '#/models/projectCreateResourceIdentifier';
import { QuickFilterPayloadSchema } from '#/models/quickFilterPayload';
import { SwimlanesPayloadSchema } from '#/models/swimlanesPayload';
import { WorkingDaysConfigSchema } from '#/models/workingDaysConfig';

/** The payload for creating a board */
export const BoardPayloadSchema = z.object({
  /**
   * Takes in a JQL string to create a new filter. If no value is provided, it'll default to a JQL filter for the
   * project creating
   */
  boardFilterJQL: z.string().optional(),
  /** Card color settings of the board */
  cardColorStrategy: z.enum(['ISSUE_TYPE', 'REQUEST_TYPE', 'ASSIGNEE', 'PRIORITY', 'NONE', 'CUSTOM']).optional(),
  cardLayout: CardLayoutSchema.optional(),
  /** Card layout settings of the board */
  cardLayouts: z.array(CardLayoutFieldSchema).optional(),
  /** The columns of the board */
  columns: z.array(BoardColumnPayloadSchema).optional(),
  /** The name of the board */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The quick filters for the board. */
  quickFilters: z.array(QuickFilterPayloadSchema).optional(),
  /** Whether sprints are supported on the board */
  supportsSprint: z.boolean().optional(),
  swimlanes: SwimlanesPayloadSchema.optional(),
  workingDaysConfig: WorkingDaysConfigSchema.optional(),
});

export type BoardPayload = z.infer<typeof BoardPayloadSchema>;
