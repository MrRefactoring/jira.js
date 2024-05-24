import type { Date } from './date.js';
import type { PagedAttachment } from './pagedAttachment.js';
import type { RenderedValue } from './renderedValue.js';
import type { SelfLink } from './selfLink.js';
import type { User } from './user.js';

export interface Comment {
  /** ID of the comment. */
  id?: string;
  /** Content of the comment. */
  body?: string;
  renderedBody?: RenderedValue;
  author?: User;
  created?: Date;
  attachments?: PagedAttachment;
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  Expands?: string[];
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public?: boolean;
  Links?: SelfLink;
}
