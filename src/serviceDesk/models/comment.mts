import { Date } from './date.mjs';
import { PagedAttachment } from './pagedAttachment.mjs';
import { RenderedValue } from './renderedValue.mjs';
import { SelfLink } from './selfLink.mjs';
import { User } from './user.mjs';

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
