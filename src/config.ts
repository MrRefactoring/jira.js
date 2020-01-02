export interface Config {
  host: string;
  timeout?: number;
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
