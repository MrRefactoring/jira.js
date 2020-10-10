export interface JsonTypeBean {
  type: string;
  items: string;
  system: string;
  custom: string;
  customId: number;
  configuration: {
    [key: string]: unknown;
  };
}
