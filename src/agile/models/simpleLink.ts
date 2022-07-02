/** @deprecated Use {@link SimpleLink} instead. */
export type SimpleLinkBean = SimpleLink;

/** Details about the operations available in this version. */
export interface SimpleLink {
  id?: string;
  styleClass?: string;
  iconClass?: string;
  label?: string;
  title?: string;
  href?: string;
  weight?: number;
}
