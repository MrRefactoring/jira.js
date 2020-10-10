export interface IssueBean {
  expand: string;
  id: string;
  self: string;
  key: string;
  renderedFields: {
    [key: string]: unknown;
  };
  properties: {
    [key: string]: unknown;
  };
  names: {
    [key: string]: unknown;
  };
  schema: {
    [key: string]: unknown;
  };
  transitions: {
    id: string;
    name: string;
    to: {
      [key: string]: unknown;
    };
    hasScreen: boolean;
    isGlobal: boolean;
    isInitial: boolean;
    isAvailable: boolean;
    isConditional: boolean;
    fields: {
      [key: string]: unknown;
    };
    expand: string;
  }[];
  operations: {
    [key: string]: unknown;
  };
  editmeta: {
    [key: string]: unknown;
  };
  changelog: {
    [key: string]: unknown;
  };
  versionedRepresentations: {
    [key: string]: unknown;
  };
  fields: {
    [key: string]: unknown;
  };
}
