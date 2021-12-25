import { RenderedValue } from './renderedValue';
import { User } from './user';
import { Date } from './date';
import { PagedAttachment } from './pagedAttachment';
import { SelfLink } from './selfLink';

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
