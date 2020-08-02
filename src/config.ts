export interface Config {
  host: string;
  timeout?: number;
  strictGDPR?: boolean;
  headers?: {
    [key: string]: number | string | boolean;
  };
  authentication?: {
    jwt?: {
      iss: string;
      secret: string;
      expiryTimeSeconds?: number;
    };
    accessToken?: string;
    basic?: {
      username: string;
      apiToken?: string;
      password?: string;
    };
  };
}
