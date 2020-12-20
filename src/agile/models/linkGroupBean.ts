export interface LinkGroupBean {
  id?: string;
  styleClass?: string;
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
  groups?: LinkGroupBean[];
}
