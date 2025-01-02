/** Details a link group, which defines issue operations. */
export interface LinkGroup {
  groups?: LinkGroup[];
  /** Details about the operations available in this version. */
  header?: {
    href?: string;
    iconClass?: string;
    id?: string;
    label?: string;
    styleClass?: string;
    title?: string;
    weight?: number;
  };
  id?: string;
  links?: {
    href?: string;
    iconClass?: string;
    id?: string;
    label?: string;
    styleClass?: string;
    title?: string;
    weight?: number;
  }[];
  styleClass?: string;
  weight?: number;
}
