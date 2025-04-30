export interface Epic {
  id: number;
  self: string;
  name: string;
  summary: string;
  color: {
    key: string;
  };
  done: boolean;
}
