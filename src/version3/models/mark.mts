export interface Mark {
  type: 'code' | 'em' | 'link' | 'strike' | 'strong' | 'subsup' | 'textColor' | 'underline' | string;
  attrs?: any;
}
