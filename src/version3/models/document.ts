import { Mark } from './mark';

export interface Document {
  type:
  | 'doc'
  | 'paragraph'
  | 'table'
  | 'blockquote'
  | 'bulletList'
  | 'codeBlock'
  | 'heading'
  | 'mediaGroup'
  | 'mediaSingle'
  | 'orderedList'
  | 'panel'
  | 'rule'
  | 'listItem'
  | 'media'
  | 'table_cell'
  | 'table_header'
  | 'table_row'
  | 'emoji'
  | 'hardBreak'
  | 'inlineCard'
  | 'mention'
  | 'text'
  | string;
  content?: Omit<Document, 'version'>[];
  version: number;
  marks?: Mark[];
  attrs?: any;
  text?: string;
}
