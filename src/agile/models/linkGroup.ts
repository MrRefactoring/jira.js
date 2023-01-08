/** @deprecated Use {@link LinkGroup} instead. */
export type LinkGroupBean = LinkGroup;

/** Details a link group, which defines issue operations. */
export interface LinkGroup {
  id?: string;
  styleClass?: string;
  /** Details about the operations available in this version. */
  header?: {
    id?: string;
    styleClass?: string;
    iconClass?: string;
    label?: string;
    title?: string;
    href?: string;
    weight?: number;
  };
  weight?: number;
  links?: {
    id?: string;
    styleClass?: string;
    iconClass?: string;
    label?: string;
    title?: string;
    href?: string;
    weight?: number;
  }[];
  groups?: LinkGroup[];
}
