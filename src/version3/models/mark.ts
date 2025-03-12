export interface Mark {
  type: 'code' | 'em' | 'link' | 'strike' | 'strong' | 'subsup' | 'textColor' | 'underline' | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs?: any;
}
